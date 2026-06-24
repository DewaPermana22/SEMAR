import cv2
import numpy as np


def capture_eye_frame():
    cap = cv2.VideoCapture(0)
    print("Posisikan mata di tengah frame.")
    print("Tekan 's' untuk capture, 'q' untuk batal.\n")

    captured = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (9, 9), 2)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(blur)

        display = frame.copy()
        h, w = gray.shape

        # Preview deteksi lingkaran secara live
        circles = cv2.HoughCircles(
            enhanced, cv2.HOUGH_GRADIENT,
            dp=1.2, minDist=int(w * 0.1),
            param1=50, param2=25,
            minRadius=int(w * 0.08), maxRadius=int(w * 0.30)
        )

        if circles is not None:
            for (x, y, r) in np.uint16(np.around(circles[0])):
                cv2.circle(display, (x, y), r, (0, 255, 0), 2)
                cv2.circle(display, (x, y), 3, (0, 255, 0), -1)
            cv2.putText(display, "Iris terdeteksi! Tekan 's'",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        0.7, (0, 255, 0), 2)
        else:
            cv2.putText(display, "Cari iris... dekatkan mata ke kamera",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                        0.6, (0, 0, 255), 2)

        cv2.imshow("Iris Scanner - Tekan S untuk capture", display)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('s'):
            captured = enhanced   # simpan versi enhanced
            print("Frame di-capture!")
            break
        elif key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return captured

def detect_iris_pupil(gray_img):
    """
    Versi lebih robust dengan beberapa strategi fallback.
    """
    h, w = gray_img.shape

    # ── Preprocessing lebih agresif ──
    blur = cv2.GaussianBlur(gray_img, (9, 9), 2)
    
    # CLAHE: tingkatkan kontras lokal
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(blur)

    # ── Estimasi ukuran berdasarkan resolusi frame ──
    # Asumsi iris ~25% dari lebar frame
    iris_min = int(w * 0.08)
    iris_max = int(w * 0.30)
    pupil_min = int(iris_min * 0.2)
    pupil_max = int(iris_min * 0.8)

    print(f"  Frame size: {w}x{h}")
    print(f"  Cari pupil r={pupil_min}–{pupil_max}, iris r={iris_min}–{iris_max}")

    # ── Deteksi iris ──
    iris = None
    for param2 in [40, 30, 20, 15]:  # coba threshold berbeda
        circles = cv2.HoughCircles(
            enhanced,
            cv2.HOUGH_GRADIENT,
            dp=1.2,
            minDist=int(w * 0.1),
            param1=50,
            param2=param2,
            minRadius=iris_min,
            maxRadius=iris_max
        )
        if circles is not None:
            iris = np.uint16(np.around(circles[0][0]))
            print(f"  Iris terdeteksi (param2={param2}): {iris}")
            break

    if iris is None:
        print("  ❌ Iris tidak ditemukan.")
        return None, None

    # ── Deteksi pupil di ROI sekitar iris ──
    ix, iy, ir = iris
    # Crop area iris saja
    x1 = max(0, ix - ir)
    y1 = max(0, iy - ir)
    x2 = min(w, ix + ir)
    y2 = min(h, iy + ir)
    roi = enhanced[y1:y2, x1:x2]

    pupil = None
    for param2 in [30, 20, 15, 10]:
        circles = cv2.HoughCircles(
            roi,
            cv2.HOUGH_GRADIENT,
            dp=1,
            minDist=10,
            param1=50,
            param2=param2,
            minRadius=pupil_min,
            maxRadius=pupil_max
        )
        if circles is not None:
            px, py, pr = np.uint16(np.around(circles[0][0]))
            # Konversi balik ke koordinat frame asli
            pupil = np.array([px + x1, py + y1, pr], dtype=np.uint16)
            print(f"  Pupil terdeteksi (param2={param2}): {pupil}")
            break

    # ── Fallback: estimasi pupil dari tengah iris ──
    if pupil is None:
        print("  ⚠️  Pupil tidak ditemukan, estimasi dari tengah iris.")
        pupil = np.array([ix, iy, int(ir * 0.35)], dtype=np.uint16)

    return pupil, iris


def normalize_iris(image, pupil, iris, radial_res=64, angular_res=512):
    """
    Konversi iris dari koordinat kartesian ke polar.
    Output: array 2D (radial_res x angular_res) — citra iris yang dinormalisasi.
    """
    px, py, pr = pupil  # pupil center x, y, radius
    ix, iy, ir = iris   # iris center x, y, radius

    normalized = np.zeros((radial_res, angular_res), dtype=np.uint8)

    for r_idx in range(radial_res):
        for theta_idx in range(angular_res):
            theta = 2 * np.pi * theta_idx / angular_res
            r = r_idx / radial_res  # 0 (pupil edge) → 1 (iris edge)

            # Interpolasi dari tepi pupil ke tepi iris
            x_pupil = px + pr * np.cos(theta)
            y_pupil = py + pr * np.sin(theta)
            x_iris  = ix + ir * np.cos(theta)
            y_iris  = iy + ir * np.sin(theta)

            x = int((1 - r) * x_pupil + r * x_iris)
            y = int((1 - r) * y_pupil + r * y_iris)

            if 0 <= x < image.shape[1] and 0 <= y < image.shape[0]:
                normalized[r_idx, theta_idx] = image[y, x]

    return normalized  # shape: (64, 512)

from scipy.signal import convolve2d

def extract_iriscode(normalized_iris):
    """
    Menggunakan Gabor filter untuk ekstraksi tekstur,
    lalu encode ke matriks biner (IrisCode).
    """
    # Buat kernel Gabor (8x8, orientasi berbeda)
    def gabor_kernel(size=8, freq=0.5, theta=0):
        x, y = np.mgrid[-size//2:size//2, -size//2:size//2]
        x_rot = x * np.cos(theta) + y * np.sin(theta)
        y_rot = -x * np.sin(theta) + y * np.cos(theta)
        gaussian = np.exp(-0.5 * (x_rot**2 + y_rot**2))
        sinusoid = np.exp(2j * np.pi * freq * x_rot)
        return gaussian * sinusoid

    iris_code_parts = []

    # Terapkan Gabor filter di 4 orientasi
    for theta in [0, np.pi/4, np.pi/2, 3*np.pi/4]:
        kernel = gabor_kernel(theta=theta)
        
        # Konvolusi (real & imag = phase information)
        response = convolve2d(
            normalized_iris.astype(float),
            np.real(kernel),
            mode='same'
        )
        # Encode ke bit: positif = 1, negatif = 0
        binary_code = (response >= 0).astype(np.uint8)
        iris_code_parts.append(binary_code)

    # Stack semua orientasi → matriks fitur
    iris_code = np.stack(iris_code_parts, axis=0)  # shape: (4, 64, 512)
    return iris_code  # Matriks 3D: orientasi × radial × angular

def hamming_distance(code1, code2):
    """
    Hitung jarak antara dua IrisCode.
    Nilai 0.0 = identik, ~0.5 = tidak cocok.
    """
    # XOR: posisi berbeda = 1
    xor_result = np.bitwise_xor(code1, code2)
    distance = np.sum(xor_result) / xor_result.size
    return distance

def verify_iris(probe_code, enrolled_code, threshold=0.38):
    """
    Threshold yang lebih ketat:
    - < 0.25  → DITERIMA (sangat mirip, kemungkinan orang sama)
    - 0.25–0.38 → ZONA ABU-ABU (minta scan ulang)  
    - > 0.38  → DITOLAK
    """
    # Cek ukuran template sama
    if probe_code.shape != enrolled_code.shape:
        print("❌ Template tidak valid.")
        return False

    hd = hamming_distance(probe_code, enrolled_code)
    print(f"Hamming Distance: {hd:.4f}")

    if hd < 0.25:
        print("✅ AKSES DITERIMA")
        return True
    elif hd < 0.38:
        print(f"⚠️  ZONA ABU-ABU (HD={hd:.4f}) — Scan ulang diperlukan")
        return False
    else:
        print(f"❌ AKSES DITOLAK (HD={hd:.4f})")
        return False
    
    

def iris_security_pipeline(mode='enroll', enrolled_template=None):
    print("\n" + "="*45)
    print(f"  MODE: {mode.upper()}")
    print("="*45)

    # ── STEP 1: Liveness check ──
    print("\n[1/4] Liveness Detection...")
    blink_ok = check_blink(duration_sec=4)

    if not blink_ok:
        print("❌ GAGAL: Tidak terdeteksi kedipan mata asli.")
        return None  # ← return None, bukan False

    print("✅ Liveness OK\n")

    # ── STEP 2: Capture ──
    print("[2/4] Capture iris...")
    gray = capture_eye_frame()
    if gray is None:
        print("❌ Capture dibatalkan.")
        return None

    # ── STEP 3: Texture check ──
    print("\n[3/4] Cek tekstur frame...")
    is_live, scores = check_liveness(gray)

    if not is_live:
        print("❌ GAGAL: Tekstur tidak natural.")
        print(f"   Scores: {scores}")
        return None  # ← return None, bukan False

    print("✅ Tekstur OK\n")

    # ── STEP 4: Proses iris ──
    print("[4/4] Proses iris...")
    pupil, iris_circle = detect_iris_pupil(gray)

    if pupil is None:
        print("❌ Iris tidak terdeteksi.")
        return None

    normalized  = normalize_iris(gray, pupil, iris_circle)
    iris_code   = extract_iriscode(normalized)

    print(f"  IrisCode shape : {iris_code.shape}")
    print(f"  Total bits     : {iris_code.size}")

    if mode == 'enroll':
        np.save('enrolled_iris.npy', iris_code)
        print("\n✅ Template iris tersimpan!")
        return iris_code   # ← return array, bukan True/False

    elif mode == 'verify':
        if enrolled_template is None:
            print("❌ Tidak ada template untuk dibandingkan.")
            return None
        print()
        return verify_iris(iris_code, enrolled_template)

    return None


def check_liveness(frame):
    """
    Threshold dikalibrasi untuk kamera laptop biasa.
    """
    scores = {}

    laplacian_var = cv2.Laplacian(frame, cv2.CV_64F).var()
    scores['texture'] = laplacian_var
    print(f"  Tekstur variance : {laplacian_var:.2f}  (min: 10)")

    _, bright_spots = cv2.threshold(frame, 220, 255, cv2.THRESH_BINARY)
    bright_count = int(np.sum(bright_spots > 0))
    scores['reflection'] = bright_count
    print(f"  Bright spots     : {bright_count}  (min: 3)")

    hist = cv2.calcHist([frame], [0], None, [256], [0, 256])
    hist_std = float(np.std(hist))
    scores['histogram'] = hist_std
    print(f"  Histogram std    : {hist_std:.2f}  (min: 20)")

    is_live = (
        laplacian_var > 10 and   # turunkan dari 100 → 10
        bright_count > 3 and     # turunkan dari 5 → 3
        hist_std > 20            # turunkan dari 30 → 20
    )

    return is_live, scores



def check_blink(duration_sec=3):
    """
    Minta user kedipkan mata untuk buktikan ini mata asli.
    Menggunakan Eye Aspect Ratio (EAR).
    """
    # Load face + eye detector
    eye_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_eye.xml'
    )
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    )

    cap = cv2.VideoCapture(0)
    blink_detected = False
    eye_was_open = False
    start_time = cv2.getTickCount()

    print("  Kedipkan mata 1x untuk verifikasi...")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        display = frame.copy()

        # Deteksi wajah dulu
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        eye_open_now = False
        for (fx, fy, fw, fh) in faces:
            roi_gray = gray[fy:fy+fh, fx:fx+fw]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 3)
            if len(eyes) >= 2:
                eye_open_now = True

        # Deteksi transisi buka → tutup → buka = kedip
        if eye_was_open and not eye_open_now:
            blink_detected = True
            cv2.putText(display, "Kedipan terdeteksi!", (10, 60),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        eye_was_open = eye_open_now

        # Hitung sisa waktu
        elapsed = (cv2.getTickCount() - start_time) / cv2.getTickFrequency()
        sisa = max(0, duration_sec - int(elapsed))

        status = "Mata terbuka" if eye_open_now else "Mata tertutup"
        cv2.putText(display, f"{status} | Sisa: {sisa}s",
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)
        cv2.imshow("Liveness Check - Kedipkan mata!", display)

        if blink_detected or elapsed > duration_sec:
            break

        cv2.waitKey(1)

    cap.release()
    cv2.destroyAllWindows()
    return blink_detected
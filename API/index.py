import cv2

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Kamera tidak terdeteksi!")
    exit()

print("Kamera terbuka. Tekan tombol 'q' pada keyboard untuk menutup jendela.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Gagal mengambil gambar dari kamera.")
        break

    cv2.imshow('SEMAR APP', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
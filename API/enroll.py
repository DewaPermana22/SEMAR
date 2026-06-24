import numpy as np
from iris_system import iris_security_pipeline

print("=== MODE ENROLLMENT ===")
print("Ini untuk mendaftarkan iris kamu pertama kali.")
print("Arahkan mata ke kamera, lalu tekan 's' untuk capture.\n")

template = iris_security_pipeline(mode='enroll')

# Validasi: pastikan dapat array, bukan None/False
if template is not None and hasattr(template, 'shape'):
    print(f"\n✅ Berhasil! Template disimpan sebagai 'enrolled_iris.npy'")
    print(f"   Shape matriks : {template.shape}")
    print(f"   Total bits    : {template.size}")
else:
    print("\n❌ Enrollment gagal. Kemungkinan penyebab:")
    print("   - Liveness check tidak lolos (coba kedipkan mata lebih jelas)")
    print("   - Iris tidak terdeteksi (dekatkan wajah ke kamera)")
    print("   - Tekstur frame terlalu rendah (pastikan pencahayaan cukup)")
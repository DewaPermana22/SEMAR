import numpy as np
import os
from iris_system import iris_security_pipeline

print("=== MODE VERIFIKASI ===")

# Cek template ada
if not os.path.exists('enrolled_iris.npy'):
    print("❌ Template tidak ditemukan! Jalankan enroll.py dulu.")
    exit()

enrolled = np.load('enrolled_iris.npy')
print(f"Template loaded: shape={enrolled.shape}\n")

hasil = iris_security_pipeline(mode='verify', enrolled_template=enrolled)

if hasil is True:
    print("\n→ Akses diberikan!")
elif hasil is False:
    print("\n→ Akses ditolak.")
else:
    print("\n→ Proses gagal, coba lagi.")
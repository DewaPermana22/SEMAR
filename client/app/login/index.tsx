import React, { useState } from 'react';
import type { LoginProps } from '../types/auth.type';

const Login: React.FC<LoginProps> = ({ actor }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Menentukan teks dinamis berdasarkan aktor login
  const titleText = {
    Operator: 'Sistem Administrasi Proktor & Operator Sekolah',
    Siswa: 'Portal Ruang Ujian Evaluasi Siswa',
    Dinas: 'Dasbor Monitoring & Evaluasi Dinas Pendidikan'
  }[actor];

  const inputPlaceholder = actor === 'Siswa' ? 'Masukkan NISN / Nomor Peserta' : 'Masukkan Username / NIP';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Login sebagai ${actor}:`, { userId, password });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      
      {/* SEBELAH KIRI: Gambar / Banner Informasi */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#19376d] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Dekorasi Grid Pattern Halus */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Bagian Atas: Identitas */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-lg">
            🏛️
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block">SEMAR</span>
            <span className="text-[9px] text-blue-200 font-semibold tracking-wider block -mt-1 uppercase">Sistem Evaluasi & Monitoring Akademik</span>
          </div>
        </div>

        {/* Bagian Tengah: Ilustrasi Teknis Minimalis */}
        <div className="relative z-10 my-auto max-w-md space-y-6">
          <div className="w-20 h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
            {actor === 'Siswa' ? '📝' : actor === 'Operator' ? '💻' : '📊'}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white font-instrument">
            {titleText}
          </h1>
          <p className="text-sm text-blue-200/80 leading-relaxed">
            Pastikan perangkat Anda terhubung dengan jaringan internet stabil dan gunakan peramban (browser) versi terbaru demi kelancaran sistem.
          </p>
        </div>

        {/* Bagian Bawah: Hak Cipta */}
        <div className="relative z-10 text-[11px] text-blue-200/50">
          &copy; {new Date().getFullYear()} SEMAR — Republik Indonesia. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </div>

      {/* SEBELAH KANAN: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Mobile / Identitas Form */}
          <div className="space-y-2">
            <div className="lg:hidden flex items-center gap-2 text-blue-900 font-black text-xl mb-6">
              🏛️ SEMAR
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight font-instrument uppercase">
              Masuk Akun
            </h2>
            <p className="text-sm text-gray-500">
              Silakan masukkan kredensial resmi Anda untuk mengakses sistem sebagai <span className="font-bold text-blue-900">{actor}</span>.
            </p>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                ID Pengguna / Nomor Identitas
              </label>
              <input 
                type="text" 
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-900 bg-gray-50/50 transition font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Kata Sandi (Password)
                </label>
                {actor !== 'Siswa' && (
                  <a href="#lupa-password" className="text-xs font-semibold text-blue-800 hover:underline">
                    Lupa Password?
                  </a>
                )}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-900 bg-gray-50/50 transition font-medium"
              />
            </div>

            {actor === 'Siswa' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Token Ujian (Opsional)
                </label>
                <input 
                  type="text" 
                  placeholder="Masukkan 6 Digit Token Sesi"
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-900 bg-gray-50/50 transition font-medium uppercase tracking-widest text-center"
                />
              </div>
            )}

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-[#19376d] hover:bg-blue-900 text-white py-3.5 rounded text-sm font-bold tracking-wide transition shadow-sm uppercase"
              >
                Masuk ke Dasbor
              </button>
            </div>
          </form>

          {/* Navigasi Balik ke Beranda */}
          <div className="text-center pt-4 border-t border-gray-100">
            <a href="/" className="text-xs font-bold text-gray-500 hover:text-blue-900 transition flex items-center justify-center gap-1">
              ⬅️ Kembali ke Portal Utama
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
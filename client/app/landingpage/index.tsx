import React, { useState } from 'react';
import Navbar from '../components/navigation/navbar';
import Topbar from '../components/navigation/topbar';
import AccessPortal from '~/components/navigation/access-portal';

const Index = () => {
  // State untuk Tab Pengumuman / Informasi Terbaru
  const [activeTab, setActiveTab] = useState('semua');

  const pengumuman = [
    {
      id: 1,
      kategori: 'Pelaksanaan',
      tanggal: '01 Juli 2026',
      judul: 'Pemberitahuan Pelaksanaan Ujian Kesetaraan Periode II Tahun Anggaran 2026',
      deskripsi: 'Sesuai dengan surat edaran kepala badan, pelaksanaan ujian kesetaraan akan serentak dimulai pada minggu ketiga bulan ini.'
    },
    {
      id: 2,
      kategori: 'Unduhan',
      tanggal: '28 Juni 2026',
      judul: 'Rilis Buku Panduan Proktor dan Teknisi SEMAR Versi 3.4',
      deskripsi: 'Dokumen panduan konfigurasi ruang laboratorium komputer dan instalasi aplikasi exambrowser mandiri.'
    },
    {
      id: 3,
      kategori: 'Teknis',
      tanggal: '15 Juni 2026',
      judul: 'Pembaruan Sistem Keamanan Sinkronisasi Bank Soal Berbasis Enkripsi Ganda',
      deskripsi: 'Peningkatan performa server lokal sekolah untuk meminimalisir kegagalan unggah berkas hasil ujian.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Topbar />
      <Navbar />
      {/* 3. HERO / BANNER UTAMA */}
      <header id="beranda" className="relative bg-[#19376d] text-white overflow-hidden py-16 lg:py-24">
        {/* Dekorasi Grid Pattern Halus */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="space-y-5 lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
              Selamat Datang di Portal Evaluasi, Penilaian, dan Monitoring Mutu Pendidikan
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
              SEMAR menyediakan infrastruktur pelaksanaan ujian terstandarisasi untuk sekolah, madrasah, dan lembaga pendidikan formal di seluruh penjuru Indonesia guna mewujudkan pemetaan mutu pendidikan yang transparan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-2.5 rounded font-bold text-sm tracking-wide transition shadow">
                SIMULASI UJIAN MANDIRI
              </button>
              <button className="bg-transparent border border-white/40 hover:bg-white/10 text-white px-6 py-2.5 rounded font-semibold text-sm tracking-wide transition">
                PANDUAN AKREDITASI SISTEM
              </button>
            </div>
          </div>

          <AccessPortal/>
        </div>
      </header>

      {/* 4. STATISTIK DATA NASIONAL REAL-TIME */}
      <section id="statistik" className="bg-white py-10 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100 text-center">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl font-black text-blue-900">38</p>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Provinsi Terintegrasi</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl font-black text-blue-900">14.820</p>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Satuan Pendidikan (Sekolah)</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl font-black text-blue-900">1.240.512</p>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Siswa Terdaftar</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl font-black text-blue-900">99,98%</p>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Kelancaran Server Sesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PUSAT INFORMASI & PENGUMUMAN RESMI */}
      <section id="pengumuman" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Kolom Kiri: Pengumuman Berita */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-blue-900 uppercase tracking-tight flex items-center gap-2">
              📢 Informasi & Pengumuman Terbaru
            </h2>
            <span className="text-xs font-semibold text-blue-800 hover:underline cursor-pointer">Lihat Semua Arsip</span>
          </div>

          {/* Filter Tab Sederhana */}
          <div className="flex gap-2 border-b border-gray-100 pb-2">
            {['semua', 'Pelaksanaan', 'Unduhan', 'Teknis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded font-medium capitalize transition ${activeTab === tab ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List Item Berita */}
          <div className="space-y-4">
            {pengumuman
              .filter(p => activeTab === 'semua' || p.kategori === activeTab)
              .map((item) => (
                <div key={item.id} className="bg-white p-5 rounded border border-gray-200 hover:shadow-sm transition flex flex-col sm:flex-row gap-4 items-start">
                  <div className="sm:w-32 flex-shrink-0 text-left">
                    <span className="inline-block bg-blue-50 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-blue-200 mb-1">
                      {item.kategori}
                    </span>
                    <p className="text-xs text-gray-400 font-medium">{item.tanggal}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 hover:text-blue-900 cursor-pointer transition">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Kolom Kanan: Unduhan Dokumen Terkait */}
        <div id="unduhan" className="lg:col-span-4 space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-extrabold text-blue-900 uppercase tracking-tight flex items-center gap-2">
              📂 Unduhan Berkas
            </h2>
          </div>

          <div className="bg-white rounded border border-gray-200 divide-y divide-gray-100">
            <div className="p-4 hover:bg-gray-50 flex justify-between items-center group">
              <div>
                <p className="text-xs font-bold text-gray-800">Peraturan Kepala Badan Nomor 12 Tahun 2026</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Format: PDF | Ukuran: 2.4 MB</p>
              </div>
              <button className="text-blue-900 bg-gray-100 group-hover:bg-blue-900 group-hover:text-white p-2 rounded text-xs transition">⬇️</button>
            </div>

            <div className="p-4 hover:bg-gray-50 flex justify-between items-center group">
              <div>
                <p className="text-xs font-bold text-gray-800">Aplikasi SEMAR Exambrowser (Windows 64-bit)</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Format: ZIP | Ukuran: 84.1 MB</p>
              </div>
              <button className="text-blue-900 bg-gray-100 group-hover:bg-blue-900 group-hover:text-white p-2 rounded text-xs transition">⬇️</button>
            </div>

            <div className="p-4 hover:bg-gray-50 flex justify-between items-center group">
              <div>
                <p className="text-xs font-bold text-gray-800">Paket Contoh Berkas Impor Siswa & Nilai</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Format: XLSX | Ukuran: 412 KB</p>
              </div>
              <button className="text-blue-900 bg-gray-100 group-hover:bg-blue-900 group-hover:text-white p-2 rounded text-xs transition">⬇️</button>
            </div>
          </div>

          {/* Banner Tambahan Link Eksternal Portal Pemerintah */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded p-4">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">💡 Layanan Pengaduan Berintegritas</h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Ditemukan kendala kecurangan sistem atau indikasi penyalahgunaan wewenang? Laporkan segera melalui kontak aduan terpadu dinas setempat.
            </p>
          </div>
        </div>
      </section>

      {/* 6. INSTANSI PARTNER / STRUKTUR BAWAH */}
      <footer className="bg-[#0b2447] text-gray-300 pt-12 pb-6 border-t-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 text-xs">

          <div className="md:col-span-5 space-y-3">
            <span className="text-base font-black text-white tracking-wider block">SEMAR</span>
            <p className="text-gray-400 leading-relaxed">
              Sistem Evaluasi & Monitoring Akademik Responsif dikembangkan demi standarisasi instrumen pengukuran capaian kompetensi dasar siswa secara nasional, berkontribusi penuh pada satu data mutu pendidikan Indonesia.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wide">Hubungi Sekretariat</h4>
            <p className="text-gray-400">Gedung Pusat Penilaian Pendidikan Nasional, Lantai 4-5</p>
            <p className="text-gray-400">Jl. Jenderal Sudirman, Senayan, Jakarta Pusat</p>
            <p className="text-gray-400 mt-2">✉️ Hubungi Elektronik: sekretariat@semar.go.id</p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wide">Tautan Lembaga</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Kementerian Pendidikan dan Kebudayaan</a></li>
              <li><a href="#" className="hover:text-white transition">Badan Standar Mutu Pendidikan</a></li>
              <li><a href="#" className="hover:text-white transition">Satu Data Indonesia</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-6 text-center text-[11px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} SEMAR — Republik Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
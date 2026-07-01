import React from 'react'

const Topbar = () => {
    // Isi teks pengumuman marquee
    const marqueeContent = (
        <>
            <span className="mx-4 font-semibold text-yellow-400">[PENGUMUMAN]</span> 
            Sinkronisasi data peserta ujian gelombang kedua ditutup hari ini pukul 16.00 WIB. 
            <span className="mx-6 text-white/40">|</span>
            <span className="mx-4 font-semibold text-emerald-400">[INFO TEKNIS]</span> 
            Pembaruan sistem exambrowser versi 3.4 telah tersedia, harap seluruh proktor segera mengunduh berkas terbaru.
            <span className="mx-6 text-white/40">|</span>
            <span className="mx-4 font-semibold text-yellow-400">[MAINTENANCE]</span> 
            Pemeliharaan server pusat akan dilakukan pada hari Sabtu mulai pukul 23.00 WIB.
        </>
    );

    return (
        <div className="bg-primary text-white text-xs py-2 border-b border-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-6">
                
                <div className="flex font-instrument items-center gap-2 tracking-wide font-bold whitespace-nowrap shrink-0">
                    <span>PORTAL RESMI EVALUASI AKADEMIK NASIONAL</span>
                </div>

                <div className="flex-1 hidden md:block overflow-hidden text-gray-300 font-sans border-l border-white/20 pl-4">
                    {React.createElement(
                        'marquee',
                        {
                            behavior: 'scroll',
                            direction: 'left',
                            scrollamount: '4',
                            className: 'cursor-pointer'
                        },
                        marqueeContent
                    )}
                </div>

                <div className="hidden text-link-disabled sm:flex gap-4 items-center font-medium font-instrument shrink-0">
                    <a href="#kontak" className="hover:text-white transition">Kontak Kami</a>
                    <span className="text-white/20">|</span>
                    <a href="#bantuan" className="hover:text-white transition">Bantuan Teknis</a>
                </div>

            </div>
        </div>
    )
}

export default Topbar;
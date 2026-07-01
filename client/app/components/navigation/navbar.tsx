const navbar = () => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center space-x-3">
                        <img src="/semar.svg" alt="Logo" className="h-16 w-auto" />
                        <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-widest text-blue-900 font-fredoka block">SEMAR</h1>
                        <p className="text-sm font-sans -mt-2 font-medium text-text block">Sistem Evaluasi Mutu Akademik Responsif</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 font-medium text-sm text-text">
                        <a href="#beranda" className="hover:text-link-hover transition">Beranda</a>
                        <a href="#pengumuman" className="hover:text-link-hover transition">Pengumuman</a>
                        <a href="#statistik" className="hover:text-link-hover transition">Data Nasional</a>
                        <a href="#unduhan" className="hover:text-link-hover transition">Unduhan Dokumen</a>
                    </div>
                    <div>
                        <button className="bg-primary cursor-pointer hover:bg-primary-hover text-white px-5 py-2 rounded text-sm font-semibold tracking-wide transition shadow-sm flex items-center gap-2">
                        MASUK SISTEM
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default navbar
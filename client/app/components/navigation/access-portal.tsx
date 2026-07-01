import CardAccessPortal from '../card/card-access-portal';
import { MdLockPerson } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { FaBuildingUser, FaUserGear, FaUserGraduate } from 'react-icons/fa6';

const AccessPortal = () => {
    const navigate = useNavigate();
    const portals = [
        {
            title: "Login Operator / Proktor",
            description: "Kelola token, server lokal, & peserta",
            action: () => navigate('/login/proktor'),
            icon: <FaUserGear className="text-2xl text-primary" />
        },
        {
            title: "Login Dinas Pendidikan",
            description: "Monitoring wilayah & statistik kelulusan",
            action: () => navigate('/login/dinas'),
            icon: <FaBuildingUser className="text-2xl text-primary" />
        },
        {
            title: "Daftar Ujian",
            description: "Daftarkan diri anda untuk mengikuti ujian",
            action: () => navigate('/login/siswa'),
            icon: <FaUserGraduate className="text-2xl text-primary" />
        }
    ];

    return (
        <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white text-gray-800 p-6 rounded-lg shadow-xl border border-gray-200 font-instrument">
                <h3 className="text-md font-bold text-primary border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide flex items-center gap-2">
                    <MdLockPerson className="text-2xl" /> Pintu Akses Pengguna
                </h3>
                <div className="space-y-3">
                    {portals.map((portal, index) => (
                        <CardAccessPortal
                            key={index}
                            title={portal.title}
                            description={portal.description}
                            onClick={portal.action}
                            icon={portal.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccessPortal;
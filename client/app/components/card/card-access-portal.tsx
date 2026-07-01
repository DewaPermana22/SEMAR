import type { CardAccessPortalProps } from '../../types/card-access-portal.type';

const CardAccessPortal = ({ title, description, onClick, icon }: CardAccessPortalProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full cursor-pointer p-3 text-left border border-gray-200 hover:border-link-hover hover:bg-blue-100/50 rounded flex items-center justify-between transition group font-sans"
        >
            <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-text-secondary mt-0.5">{description}</p>
            </div>
            <div className="ml-2">{icon}</div>
        </button>
    );
};

export default CardAccessPortal;
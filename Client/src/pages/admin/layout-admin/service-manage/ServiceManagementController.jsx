import { PiCourtBasketballLight } from "react-icons/pi";
import { PiBookOpenBold } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ServiceButton = ({ icon: Icon, text, path, onClick }) => (
    <button
        onClick={() => onClick(path)}
        className="flex items-center justify-center w-56 px-6 py-4 text-lg font-medium text-white bg-green-600 rounded-xl shadow-md hover:bg-green-700 active:scale-95 transition-all duration-300"
    >
        <Icon className="mr-2 text-3xl" />
        {text}
    </button>
);

ServiceButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default function ServiceManagementController() {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const buttonData = [
        { icon: PiCourtBasketballLight, text: "Sân bóng", path: "/admin/soccer-manage" },
        { icon: PiCourtBasketballLight, text: "Sân Pickleball", path: "/admin/soccer-manage" },
        { icon: CgGym, text: "Phòng tập", path: "/admin/room-manage" },
        { icon: PiBookOpenBold, text: "Khóa học", path: "/admin/courses-manage" },
    ];

    return (
        <div className="w-full p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg">
            <h4 className="text-3xl font-bold text-center text-green-800 mb-6">
                Quản lý Dịch vụ
            </h4>
            <div className="flex flex-wrap justify-center gap-6">
                {buttonData.map((button, index) => (
                    <ServiceButton
                        key={index}
                        icon={button.icon}
                        text={button.text}
                        path={button.path}
                        onClick={handleButtonClick}
                    />
                ))}
            </div>
        </div>
    );
}
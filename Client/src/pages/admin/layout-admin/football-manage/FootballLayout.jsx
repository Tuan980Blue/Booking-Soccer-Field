import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";

const FootballLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <div className={""}>
                <Navbar/>
            </div>

            {/* Đảm bảo khoảng cách với Navbar */}
            <div className="container mx-auto p-4 pt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default FootballLayout;
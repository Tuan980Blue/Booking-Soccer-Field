import FieldListPage from "./FieldListPage.jsx";
import HistoryBookingAdmin from "./HistoryBookingPage.jsx";

const HomeSoccerPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <FieldListPage/>
                </div>
                <div>
                    <HistoryBookingAdmin/>
                </div>
            </div>
        </div>
    );
};

export default HomeSoccerPage;
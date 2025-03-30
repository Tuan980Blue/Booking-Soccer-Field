import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export function PageNotFound() {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
      <div className={"h-screen w-full p-10 flex justify-center items-center"}>
        <div className={"w-full flex flex-col justify-center items-center"}>
          <img
              src="/404.png"
              className={"h-full w-full sm:w-2/3 md:w-1/3"}
              alt="404"
          />
          <button
              onClick={handleReturnHome}
              className={
                "bg-green-500 hover:bg-green-600 text-sm md:text-base text-white font-bold py-2 px-4 rounded-lg"
              }
          >
              <div className={"flex justify-center items-center gap-2"}>Quay về Trang chủ <FaHome/></div>
          </button>
        </div>
      </div>
  );
}
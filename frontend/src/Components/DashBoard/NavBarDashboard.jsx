import React, { useContext } from "react";
import Logo from "./../../Assets/Images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faHome,
  faPager,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

export default function NavBarDashboard() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signing");
  };

  return (
    <nav className="bg-slate-800 border-b   z-10 border-gray-200 shadow-lg fixed w-full -top-1 md:top-0">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Icon (Logo) */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-10 w-10" src={Logo} alt="Logo" />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex  items-center space-x-4">
            <Link
              to="/DashBoard"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
            >
              <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link
              to="/Posts"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
            >
              <FontAwesomeIcon icon={faPager} />
            </Link>
            <Link
              to="/Tickets"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
            >
              <FontAwesomeIcon icon={faTicket} />
            </Link>
            <Link
              to="/Users"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

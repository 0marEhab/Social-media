import React, { useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Logo from "./../../Assets/Images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendar,
  faEnvelope,
  faGear,
  faHome,
  faNewspaper,
  faPager,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../Contexts/UserContext";

export default function SideBar() {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signing");
  };
  const location = useLocation();
  const handleProfileLink = () => {
    if (location.pathname === '/profile') {
      window.location.reload(); 
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/4 lg:w-1/12 pt-16 lg:pt-10 py-10 bg-indigo-950 flex flex-col justify-around items-center overflow-hidden z-50">
      <Link to="/DashBoard">
        <img src={Logo} alt="Logo" className="mb-16" />
      </Link>

      <Link
        to="/DashBoard"
        className="p-3 mb-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link
        to="/Posts"
        className="p-3 mb-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
      >
        <FontAwesomeIcon icon={faPager} />
      </Link>
      <Link
        to="/Tickets"
        className="p-3 mb-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
      >
        <FontAwesomeIcon icon={faTicket} />
      </Link>
      <Link
        to="/Users"
        className="p-3 mb-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
      >
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <button
        onClick={handleLogout}
        className="p-3 mb-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
}

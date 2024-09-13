import React from "react";
import Logo from "./../../Assets/Images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendar,
  faEnvelope,
  faGear,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-1/12 py-10 bg-primary flex flex-col justify-around items-center overflow-hidden">
      <img src={Logo} alt="Logo" className="mb-16"/>

      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faCalendar} />
      </div>
      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faEnvelope} />
      </div>
      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faGear} />
      </div>
      <div className="p-5 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0]">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
    </div>
  );
}

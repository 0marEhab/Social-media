import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full min-h-screen bg-bg grid grid-cols-12">
      <div className={`lg:hidden fixed top-0 left-0 z-10 w-full p-3 ${isSidebarOpen? 'bg-transparent':'bg-white shadow'}`}>
        <button onClick={toggleSidebar} className="py-2 px-3 bg-primary text-white rounded-md">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      
      <div className={`fixed lg:static ${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
        <SideBar />
      </div>

      <div className="col-span-12 lg:col-span-11 pt-10 lg:p-0">
        <Outlet />
      </div>
    </div>
  );
}

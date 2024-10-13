import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="pt-14  w-full min-h-screen dark:bg-darkBg bg-bg ">
        <div className=" lg:p-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}

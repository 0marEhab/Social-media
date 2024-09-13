import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";

export default function Layout() {
  return (
    <div className=" w-full min-h-screen bg-bg grid grid-cols-12">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className=" col-span-11">
        <Outlet />
      </div>
    </div>
  );
}

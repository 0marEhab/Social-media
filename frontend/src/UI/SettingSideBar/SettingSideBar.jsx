import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { IoHelpBuoy } from "react-icons/io5";
export default function SettingSideBar() {
  return (
    <div className="col-span-10 lg:col-span-4 xl:col-span-3 bg-secondary  text-white md:rounded-l-3xl px-10 py-16 flex flex-col  gap-3  h-screen">
      <h2 className=" text-xl font-bold ">Settings</h2>
      <div className="flex flex-col  justify-between gap-14 mx-5  my-10">
        <Link to={"/profile"}>
          <button className=" flex gap-4 items-center hover:text-gray-400 duration-300">
            <CgProfile className="size-8" />
            <p className="text-xl">My Account</p>
          </button>
        </Link>
        <Link to="/ticket">
          <button className=" flex gap-4 items-center hover:text-gray-400 duration-300">
            <IoHelpBuoy className="size-8" />
            <p className="text-xl">Help</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

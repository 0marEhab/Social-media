import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUserFriends,
  faEnvelope,
  faGear,
  faHome,
  faUser,
  faCalendar,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function HomeSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleIsOpen}
        className="lg:hidden fixed bottom-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-300 z-50"
      >
        {isOpen ? "Close" : "Open"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-xl transition-transform transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 sm:w-72 lg:w-80 p-6 z-40 md:z-0 md:pt-32`}
      >
        <div className="flex flex-col gap-8">
          <div className="bg-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <small className="text-gray-500 font-semibold">News Feed</small>
            <div className="flex flex-col gap-5 mt-4">
              <Link to={"/"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faHome} />
                  News Feed
                </button>
              </Link>
              <Link to={"/profile"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faUser} />
                  my Profile
                </button>
              </Link>
              <Link to={"/friends"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faUserFriends} />
                  My Friends
                </button>
              </Link>
              <Link to={"/friend-requests"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faHourglassEnd} />
                  Friend Requests
                </button>
              </Link>
              <Link to={"/calendar"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faCalendar} />
                  Calender
                </button>
              </Link>
              <Link to={"/chat"}>
                <button className="text-lg text-gray-800 font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 p-2 rounded-xl w-full text-left">
                  <FontAwesomeIcon className="mx-3" icon={faEnvelope} />
                  Chat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={handleIsOpen}
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden transition-opacity duration-300"
        />
      )}
    </>
  );
}

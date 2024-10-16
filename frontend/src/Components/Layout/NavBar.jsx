import React, { useState, useEffect, useContext } from "react";
import Logo from "./../../Assets/Images/logo.svg";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUserFriends,
  faEnvelope,
  faGear,
  faHome,
  faUser,
  faCalendar,
  faMoon,
  faSun,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserContext from "../../Contexts/UserContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Check for user's dark mode preference on initial load
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    applyDarkMode(darkModePreference);

    // Load user data from localStorage
    setUser(user);
    checkAdminStatus(user);
  }, [user]);

  const checkAdminStatus = (currentUser) => {
    if (currentUser?.name === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigationAndReload = (e) => {
    e.preventDefault();
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
    navigate("/signing");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-slate-800 dark:bg-darkBg border-b z-10 border-gray-200 shadow-lg fixed w-full -top-1 md:top-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Icon (Logo) */}
          <Link to={"/"}>
            <div className="flex-shrink-0">
              <img className="h-10 w-10" src={Logo} alt="Logo" />
            </div>
          </Link>
          {/* Middle (Search Bar) */}
          <div className="hidden md:flex w-full max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/dashboard"
                className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faShieldAlt} />
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <Link
              to="/settings"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FontAwesomeIcon
                className="hover:rotate-180 duration-500"
                icon={faGear}
              />
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              className="text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        } md:hidden px-4 pb-4 space-y-4 dark:bg-gray-800`}
      >
        {/* Mobile Search Bar */}
        <div className="flex">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Search..."
          />
          <button className="ml-2 text-gray-400 dark:text-gray-300">
            <IoSearch size={20} />
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex justify-center gap-10 items-center">
          {isAdmin && (
            <Link
              to="/admin"
              className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faShieldAlt} />
            </Link>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
          <Link
            to="/settings"
            className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={faGear} />
          </Link>
          <button
            onClick={handleLogout}
            className="p-3 rounded-2xl text-white flex justify-center items-center text-xl bg-[#8588F0] hover:bg-white hover:text-[#8588F0] dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
      </div>
    </nav>
  );
}

import React, { useState } from "react";

export default function HomeSideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleIsOpen}
        className="lg:hidden fixed bottom-4 left-4 bg-black text-white py-2 px-4 rounded-lg shadow-md z-50  hover:bg-gray-800 transition-all duration-300"
      >
        {isOpen ? "Close" : "Open"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-[#F3F4F6] shadow-lg shadow-slate-400 transition-transform transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 sm:w-72 lg:w-80 p-6 z-40 md:z-0 md:pt-32`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 rounded-2xl shadow-md p-8 shadow-slate-500 hover:shadow-slate-500 hover:shadow-lg duration-300 bg-[#F8F9FC]">
            <small className="text-slate-500 font-bold">News Feed</small>
            <div className="flex flex-col gap-3">
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                News Feed
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Badges
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Author Profile
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Groups
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl shadow-md p-8 shadow-slate-500 hover:shadow-slate-500 hover:shadow-lg duration-300 bg-[#F8F9FC]">
            <small className="text-slate-500 font-bold">News Feed</small>
            <div className="flex flex-col gap-3">
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                News Feed
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Badges
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Author Profile
              </button>
              <button className="text-xl shadow-sm flex justify-start hover:shadow-slate-400 hover:shadow-md p-2 w-[160px] md:w-[220px] rounded-xl duration-300 font-bold text-gray-800">
                Groups
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={handleIsOpen}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}

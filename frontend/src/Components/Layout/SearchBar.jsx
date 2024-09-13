import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SearchBar() {
  return (
    <div className="my-5 bg-white text-gray-400 rounded-2xl px-3 py-4 flex items-center justify-between">
      <form className="flex space-x-3 items-center">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" name="search" placeholder="Search in social..." />
      </form>

      <p className="font-semibold uppercase text-sm tracking-[1.00px]">Filters</p>
    </div>
  );
}

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FriendsSideBar() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/friends/suggestions`,
          {
            headers: {
              Authorization:
                `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );        
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="col-span-10 lg:col-span-4 xl:col-span-3 bg-secondary min-h-screen rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none px-10 py-16">
      <h2 className="text-xl font-bold text-white">Who to Follow</h2>
      {suggestions.map((suggestion) => (
        <div
          className="flex items-center justify-between gap-3 my-10"
          key={suggestion._id}
        >
          <div className="flex space-x-2">
            <img
              src={suggestion.profilePic}
              className="rounded-xl w-10 object-cover"
              alt={suggestion.name}
            />
            <div className="flex flex-col items-start justify-center gap-0.5">
              <p className="text-[14px] font-bold text-white">{suggestion.name}</p>
              <p className="text-[12px] font-normal text-white">
                {suggestion.email}
              </p>
            </div>
          </div>
          <button className="rounded-lg p-3 flex items-center justify-center text-xs bg-primary text-white">
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
      ))}
    </div>
  );
}

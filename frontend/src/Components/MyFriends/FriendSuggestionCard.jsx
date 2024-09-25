import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FriendSuggestionCard = ({ suggestion, handleFriendRequest }) => {
  return (
    <div
      className="flex items-center justify-between gap-3 my-4"
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
      <button
        className="rounded-lg p-3 flex items-center justify-center text-xs bg-primary text-white"
        onClick={() => handleFriendRequest(suggestion._id)}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
};

export default FriendSuggestionCard;

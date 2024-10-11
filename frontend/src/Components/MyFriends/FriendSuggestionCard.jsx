<<<<<<< HEAD
import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import summaryApi from "../../../common";
import { Link } from "react-router-dom";

const FriendSuggestionCard = ({ suggestion, handleFriendRequest }) => {
  return (
    <div
      className="flex items-center justify-between gap-3 lg:gap-10 my-4 "
      key={suggestion._id}
    >
      <Link to={`/profile/${suggestion?._id}`}>
        <div className="flex space-x-2">
          <img
            src={summaryApi.domain.url + "/" + suggestion.profilePic}
            className="rounded-xl w-10 object-cover"
            alt={suggestion.name}
          />
          <div className="flex flex-col items-start justify-center  gap-0.5">
            <p className="text-[14px] font-bold text-black">
              {suggestion.name}
            </p>
            <p className="text-[12px] font-normal text-black">
              {suggestion.email}
            </p>
          </div>
        </div>
      </Link>
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
=======
import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import summaryApi from "../../../common";
import { Link } from "react-router-dom";

const FriendSuggestionCard = ({ suggestion, handleFriendRequest }) => {
  return (
    <div
      className="flex items-center justify-between gap-3 lg:gap-10 my-4 "
      key={suggestion._id}
    >
      <Link to={`/profile/${suggestion?._id}`}>
        <div className="flex space-x-2">
          <img
            src={summaryApi.domain.url + "/" + suggestion.profilePic}
            className="rounded-xl w-10 object-cover"
            alt={suggestion.name}
          />
          <div className="flex flex-col items-start justify-center  gap-0.5">
            <p className="text-[14px] font-bold text-black">
              {suggestion.name}
            </p>
            <p className="text-[12px] font-normal text-black">
              {suggestion.email}
            </p>
          </div>
        </div>
      </Link>
      <button
        className="rounded-lg p-3 flex items-center justify-center text-xs bg-primary text-black"
        onClick={() => handleFriendRequest(suggestion._id)}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
};

export default FriendSuggestionCard;
>>>>>>> feature/admin

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export default function FriendCard({ friend }) {
  return (
    <div className=" bg-white rounded-3xl p-5 flex flex-col justify-center items-center">
      <img
        src={friend.img}
        alt={friend.name}
        className="w-16 h-16 rounded-2xl"
      />
      <h6 className="mt-3 font-bold text-gray-900">{friend.name}</h6>
      <p className="text-sm font-normal text-gray-500">{friend.email}</p>

      <button className="flex space-x-2 items-center mt-5 bg-[#53D769] px-3 py-1 rounded-lg text-white">
        <FontAwesomeIcon icon={faCheck} />
        <p>Friends</p>
      </button>
    </div>
  );
}

import React from "react";

export default function FriendCard({ friend }) {
  return (
    <li className="flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 flex-wrap rounded-lg cursor-pointer">
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-2xl"
        />
        <div>
          <h4 className="font-semibold">{friend.name}</h4>
          <p className="text-gray-500 w-[200px] text-sm truncate">
            {friend.lastMessage}
          </p>
        </div>
      </div>
      <div className="text-xs text-gray-400">
        3:03pm
        <span className="ml-2 text-red-500">●</span>
      </div>
    </li>
  );
}

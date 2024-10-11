import React from "react";
import FriendCard from "./FriendCard";

export default function ChatSideBar({
  conversation,
  onSelectConversation,
  user,
}) {
  console.log(conversation);
  return (
    <aside className="w-full lg:w-1/4 bg-white border-r border-gray-200 h-full">
      <div className="px-10 py-2">
        {/* Search Bar */}
        <div className="relative mt-10 mb-8">
          <input
            type="text"
            placeholder="Search in social..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-r-lg">
            💬
          </button>
        </div>
        {/* Inbox */}
        <h2 className="text-3xl font-semibold mb-4">Inbox</h2>
        <ul className="space-y-3 overflow-auto h-[80vh]">
          {conversation.map((c, index) => (
            <li
              key={c.id || index} // Use index as a fallback if id is not unique
              className="cursor-pointer"
              onClick={() => onSelectConversation(c)}
            >
              <FriendCard conversation={c} currentUser={user} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

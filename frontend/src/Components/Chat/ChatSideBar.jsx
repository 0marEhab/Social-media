import React from "react";
import FriendCard from "./FriendCard";

export default function ChatSideBar({ onSelectConversation }) {
  const friends = [
    { id: 1, name: "Alice", lastMessage: "Hey, how's it going?" },
    { id: 2, name: "Bob", lastMessage: "Let's catch up tomorrow!" },
    { id: 3, name: "Charlie", lastMessage: "Can you send the report?" },
    { id: 4, name: "Charlie", lastMessage: "Can you send the report?" },
    { id: 5, name: "Charlie", lastMessage: "Can you send the report?" },
    { id: 6, name: "Charlie", lastMessage: "Can you send the report?" },
    { id: 7, name: "omar", lastMessage: "Can you send the report?" },
  ];

  return (
    <aside className="w-full  bg-white border-r border-gray-200 h-full">
      <div className="px-10 py-2">
       
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
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="cursor-pointer"
              onClick={() => onSelectConversation(friend)}
            >
              <FriendCard friend={friend} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

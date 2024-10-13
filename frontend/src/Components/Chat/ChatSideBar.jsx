import React from "react";
import FriendCard from "./FriendCard";

export default function ChatSideBar({
  conversation,
  onSelectConversation,
  user,
}) {
  return (
    <aside className="w-full lg:w-1/4 bg-white border-r border-gray-200 dark:bg-darkBg h-full">
      <div className="px-10 mt-10 py-2">
      
        
        {/* Inbox */}
        <h2 className="text-3xl font-semibold mb-4 dark:text-white">Inbox</h2>
        <ul className="space-y-3 overflow-auto h-[80vh]">
          {conversation.map((c, index) => (
            <li
              key={c.id || index} 
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

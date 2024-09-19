import React from "react";
import {
  IoCall,
  IoVideocam,
  IoAdd,
  IoEllipsisHorizontal,
} from "react-icons/io5";

export default function Conversation({
  selectedConversation,
  handleBackToSidebar,
}) {
  console.log(selectedConversation);
  const messages = [
    {
      id: 1,
      sender: "Alice",
      time: "4 min",
      content: "did you see his post ",
    },
    {
      id: 2,
      sender: "Marriet Miles",
      time: "4 min",
      content: "Yes, I saw his post yesterday",
    },
  ];

  return (
    <div className="h-full flex flex-col pt-6 md:p-0">
      {/* Profile Header */}
      <div className="flex items-center p-4 border-b">
        <img
          src={selectedConversation.avatar}
          alt={selectedConversation.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-3">
          <h2 className="font-semibold">{selectedConversation.name}</h2>
          <p className="text-sm text-green-500">Online</p>
        </div>
        <div>
          <button
            className=" ml-10 bg-blue-500 text-white  shadow-md p-2 rounded-md "
            onClick={handleBackToSidebar}
          >
            ← Back
          </button>
        </div>
        <div className="ml-auto flex space-x-3">
          <IoAdd className="text-xl text-gray-500" />
          <IoCall className="text-xl text-gray-500" />
          <IoVideocam className="text-xl text-gray-500" />
          <IoEllipsisHorizontal className="text-xl text-gray-500" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === selectedConversation.name
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === selectedConversation.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <div className="flex gap-6 items-center">
                <p>{message.content}</p>
                <span className="text-xs ">{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Typing and Input Section */}
      <div className="flex items-center p-4 border-t">
        <button className="text-blue-500">+</button>
        <input
          type="text"
          placeholder="Start typing..."
          className="flex-1 mx-4 px-4 py-2 border rounded-full"
        />
        <button className="text-gray-500">😊</button>
      </div>
    </div>
  );
}

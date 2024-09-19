import React, { useState } from "react";
import ChatSideBar from "./ChatSideBar";
import Conversation from "./Conversation";

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsSidebarVisible(false);
  };

  const handleBackToSidebar = () => {
    setSelectedConversation(null);
    setIsSidebarVisible(true);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      {isSidebarVisible && (
        <ChatSideBar onSelectConversation={handleSelectConversation} />
      )}

      {/* Main Chat Section */}
      <main
        className={`flex-1 flex items-center justify-center ${
          isSidebarVisible ? "hidden lg:flex" : "flex"
        }`}
      >
        {selectedConversation ? (
          <div className="relative w-full h-full text-center">
            {/* Show back button */}

            <Conversation
              selectedConversation={selectedConversation}
              handleBackToSidebar={handleBackToSidebar}
            />

           
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl">📬</div>
            <h1 className="mt-4 text-xl font-bold">
              It's nice to chat with someone
            </h1>
            <p className="text-gray-500">
              Pick a person from the left menu and start your conversation
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

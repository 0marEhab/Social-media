import React, { useState } from "react";
import ChatSideBar from "./ChatSideBar";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.aside
            className="w-full lg:w-1/4 bg-white h-full shadow-lg lg:block"
            initial={{ x: -300, opacity: 0 }} // Slide in from the left
            animate={{ x: 0, opacity: 1 }} // Show sidebar
            exit={{ x: -300, opacity: 0 }} // Slide out to the left
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <ChatSideBar onSelectConversation={handleSelectConversation} />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.main
        className={`flex-1 flex items-center justify-center bg-gray-50 p-5 lg:p-10 transition-all duration-500 ${
          isSidebarVisible ? "hidden lg:flex" : "flex"
        }`}
      >
        <AnimatePresence>
          {selectedConversation ? (
            <motion.div
              key="conversation"
              className="relative w-full h-full flex flex-col items-center justify-center p-5 bg-white shadow-lg rounded-lg"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <button
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-md shadow-md "
                onClick={handleBackToSidebar}
              >
                ← Back
              </button>
              <h1 className="mt-4 text-2xl font-bold text-gray-800">
                Chat with {selectedConversation.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {selectedConversation.lastMessage}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="no-conversation"
              className="text-center p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl">📬</div>
              <h1 className="mt-4 text-xl font-bold text-gray-800">
                Welcome to ChatApp
              </h1>
              <p className="text-gray-500 mt-2">
                Select a conversation from the sidebar to start chatting.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

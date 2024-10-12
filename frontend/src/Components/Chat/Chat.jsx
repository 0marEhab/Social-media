import React, { useContext, useState, useEffect, useRef } from "react";
import ChatSideBar from "./ChatSideBar";
import Conversation from "./Conversation";
import UserContext from "../../Contexts/UserContext";
import axios from "axios";
import summaryApi from "../../../common";
import { io } from "socket.io-client";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const socket = useRef();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      // Ensure user is available before making the API request
      if (user && user._id) {
        try {
          const res = await axios.get(
            summaryApi.getConversation.url + user._id
          );
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getConversations();
  }, [user]); // This effect runs whenever `user` changes

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
        <ChatSideBar
          conversation={conversations}
          onSelectConversation={handleSelectConversation}
          user={user}
        />
      )}

      {/* Main Chat Section */}
      <main
        className={`flex-1 flex items-center justify-center ${
          isSidebarVisible ? "hidden lg:flex" : "flex"
        }`}
      >
        {selectedConversation ? (
          <div className="relative w-full h-full text-center">
            <Conversation
              user={user}
              selectedConversation={selectedConversation}
              handleBackToSidebar={handleBackToSidebar}
              socket={socket}
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

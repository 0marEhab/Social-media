import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  IoCall,
  IoVideocam,
  IoAdd,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import summaryApi from "../../../common";
import { format } from "timeago.js";

export default function Conversation({
  selectedConversation,
  handleBackToSidebar,
  user,
  socket,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      selectedConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, selectedConversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${summaryApi.getMessage.url}/${selectedConversation._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = async (e) => {
    e.preventDefault();
    const tempId = Date.now(); // Generate a temporary key
    const message = {
      _id: tempId, // Temporary ID
      sender: user._id,
      text: newMessage,
      conversationId: selectedConversation._id,
      createdAt: Date.now(), // Add createdAt for consistency
    };

    const receiverId = selectedConversation.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    // Optimistically add the new message to the state with a temporary key
    setMessages([...messages, message]);

    try {
      const res = await axios.post(summaryApi.postMessage.url, {
        sender: user._id,
        text: newMessage,
        conversationId: selectedConversation._id,
      });
      // Replace the temporary message with the one from the server
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === tempId ? res.data : msg))
      );
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

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
            className="ml-10 bg-blue-500 text-white shadow-md p-2 rounded-md"
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
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-150px)]">
        {messages.map((message) => (
          <div
            key={Math.random()}
            className={`flex ${
              user._id === message.sender ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                user._id === message.sender
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <div className="flex gap-6 items-center">
                <p>{message.text}</p>
                <span className="text-xs">{format(message.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing and Input Section */}
      <div className="sticky bottom-0 bg-white p-4 border-t w-full">
        <div className="flex items-center">
          <button className="text-blue-500">+</button>
          <form onSubmit={handleMessage} className="w-full mx-4">
            <input
              type="text"
              placeholder="Start typing..."
              className="flex-1 w-full px-4 py-2 border rounded-full"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </form>
          <button className="text-gray-500">😊</button>
        </div>
      </div>
    </div>
  );
}

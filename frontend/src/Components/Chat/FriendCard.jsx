import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import summaryApi from "../../../common";

export default function FriendCard({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Memoize friendId to prevent unnecessary recalculations on each render
  const friendId =
    conversation.senderId === currentUser._id
      ? conversation.receiverId
      : conversation.senderId;

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true); // Set loading to true when starting the fetch
        const res = await axios(
          `${summaryApi.getUserById.url}/?userId=${friendId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    if (friendId) getUser();
  }, [friendId, token]);

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 flex-wrap rounded-lg cursor-pointer">
      <div className="flex items-center space-x-2">
        {loading ? (
          <div className="w-10 h-10 bg-gray-300 rounded-2xl animate-pulse"></div>
        ) : (
          <img
            src={
              conversation
                ? summaryApi.domain.url +
                  "/" +
                  conversation.receiverId.profilePic
                : "https://via.placeholder.com/40"
            }
            alt="Profile"
            className="w-10 h-10 rounded-2xl"
          />
        )}
        <div>
          <h4 className="font-semibold">
            {loading
              ? "Loading..."
              : conversation
              ? conversation.receiverId.name
              : "Unknown User"}
          </h4>
          <p className="text-gray-500 w-[200px] text-sm truncate">
            {loading ? "Fetching details..." : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

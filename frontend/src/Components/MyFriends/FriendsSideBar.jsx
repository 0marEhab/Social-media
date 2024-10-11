import React, { useEffect, useState } from "react";
import axios from "axios";
import { sendFriendRequest } from "../../Utils/friends";
import { toast } from "react-hot-toast";
import Loading from "../Layout/Loading";
import FriendSuggestionCard from "./FriendSuggestionCard";
import summaryApi from "../../../common";

export default function FriendsSideBar() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(summaryApi.suggestions.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const handleFriendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
      setSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion._id !== userId)
      );
      toast.success("Friend request sent!");
    } catch (error) {
      toast.error("Failed to send friend request.");
    }
  };

  return (
    <div className="col-span-10 lg:col-span-4 xl:col-span-3 bg-white shadow-xl shadow-slate-300 min-h-screen rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none px-10 py-16">
      <h2 className="text-xl font-bold text-black">Friends Suggestions</h2>
      {loading ? (
        <Loading color={"#fff"} />
      ) : suggestions.length === 0 ? (
        <p className="text-white text-sm">No suggestions available</p>
      ) : (
        suggestions.map((suggestion) => (
          <FriendSuggestionCard
            key={suggestion._id}
            suggestion={suggestion}
            handleFriendRequest={handleFriendRequest}
          />
        ))
      )}
    </div>
  );
}

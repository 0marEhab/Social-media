import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";
import summaryApi from "../../../common";
import { sendFriendRequest } from "../../Utils/friends";
import axios from "axios";
import FriendSuggestionCard from "../../Components/MyFriends/FriendSuggestionCard";
import toast from "react-hot-toast";

export default function RightSideBar() {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

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
    <aside
      className={` hidden md:block fixed top-0 right-0 h-screen bg-[#F3F4F6] shadow-lg shadow-slate-400 transition-transform transform lg:translate-x-0 
w-64 sm:w-72 lg:w-80 p-6 z-40 md:z-0 md:pt-32`}
    >
      <div className="flex flex-col mt-4 bg-white p-4 shadow-md  shadow-slate-400 rounded-2xl w-[280px]">
        <Link to={"/friends"}>
          <h2 className="text-xl font-bold mb-4 text-black mt-4">
            Friends Suggestions
          </h2>
        </Link>
        <div className="flex flex-col gap-4 mt-2">
          {loading ? (
            <Loading color={"#fff"} />
          ) : suggestions.length === 0 ? (
            <p className="text-black text-sm">No suggestions available</p>
          ) : (
            suggestions
              .slice(0, 3)
              .map((suggestion) => (
                <FriendSuggestionCard
                  key={suggestion._id}
                  suggestion={suggestion}
                  handleFriendRequest={handleFriendRequest}
                />
              ))
          )}
        </div>
        {suggestions.length > 3 && (
          <Link
            to="/friends"
            className="text-gray-500 flex justify-center  hover:underline"
          >
            Show More
          </Link>
        )}
      </div>
    </aside>
  );
}

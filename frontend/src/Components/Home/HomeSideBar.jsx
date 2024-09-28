import { useState, useEffect, useContext } from "react";
import axios from "axios";
import summaryApi from "../../../common";
import { Link } from "react-router-dom";
import FriendSuggestionCard from "../MyFriends/FriendSuggestionCard";
import { sendFriendRequest } from "../../Utils/friends";
import Loading from "../Layout/Loading";
import { toast } from "react-hot-toast";
import UserContext from "../../Contexts/UserContext";
export default function HomeSideBar() {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  console.log(friends);
  const [suggestions, setSuggestions] = useState([]);
  console.log(suggestions);
  const [loading, setLoading] = useState(true);

  const getFriends = async () => {
    try {
      const response = await axios.get(summaryApi.myFriends.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);

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
    <div className="bg-secondary  flex flex-col lg:w-[15%] w-1/4  gap-12 px-10 py-16 fixed top-0 right-0 overflow-hidden z-50 h-screen ">
      <div className="w-max flex justify-end">
        {/* <Link to={`/profile/${user._id}`}> */}
        <img
          src={user ? summaryApi.domain.url + "/" + user.profilePic : ""}
          alt="user-img"
          className="w-14 h-14 rounded-full mt-4"
        />
        {/* </Link> */}
      </div>
      <h2 className="text-xl font-bold text-white">My Friends</h2>
      <div className="flex gap-4 mt-4">
        {friends.slice(0, 3).map((friend, index) => (
          <Link
            to={`/profile/${friend._id}`}
            className="flex items-center gap-2"
            key={index}
          >
            <img
              src={
                friend.profilePic
                  ? summaryApi.domain.url + "/" + friend.profilePic
                  : ""
              }
              alt="user-img"
              className="w-10 h-10 rounded-lg border border-black outline outline-cyan-800"
            />
          </Link>
        ))}
      </div>
      {friends.length > 5 && (
        <Link to="/friends" className="text-gray-500  hover:underline">
          Show More
        </Link>
      )}

      <div className="flex flex-col mt-4">
        <h2 className="text-xl font-bold text-white mt-4">
          Friends Suggestions
        </h2>
        <div className="flex flex-col gap-4 mt-2">
          {loading ? (
            <Loading color={"#fff"} />
          ) : suggestions.length === 0 ? (
            <p className="text-white text-sm">No suggestions available</p>
          ) : (
            suggestions
              .slice(0, 2)
              .map((suggestion) => (
                <FriendSuggestionCard
                  key={suggestion._id}
                  suggestion={suggestion}
                  handleFriendRequest={handleFriendRequest}
                />
              ))
          )}
        </div>
      </div>
      {suggestions.length > 3 && (
        <Link to="/friends" className="text-gray-500  hover:underline">
          Show More
        </Link>
      )}
    </div>
  );
}

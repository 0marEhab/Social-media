import React, { useContext, useEffect, useState } from "react";
import { FaRegEnvelope, FaEllipsisV, FaFlag, FaCalendar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../../common/index";
import axios from "axios";
import { toast } from "react-hot-toast";
import { sendFriendRequest, handleAcceptRequest } from "../../Utils/friends";

export default function Details({
  _id,
  name,
  email,
  birthDate,
  country,
  friends,
  profilePic,
  postsCount,
  activeUser,
  friendRequests,
  requestedFriends,
  setReceivedRequests,
}) {
  const [activeUserId, setActiveUserId] = useState("");
  const [friendStatus, SetFriendStatus] = useState("");

  const handleFriendStatus = () => {
    if (friendRequests.length == 0 && requestedFriends.length == 0) {
      SetFriendStatus("Add Friend");
    } else if (friendRequests.length != 0) {
      friendRequests.map((requestID) => {
        if (activeUserId === requestID) {
          SetFriendStatus("Request Sent");
        } else {
          SetFriendStatus("Add Friend");
        }
      });
    } else if (requestedFriends.length != 0) {
      requestedFriends.map((requestID) => {
        if (activeUserId === requestID) {
          SetFriendStatus("Accept Request");
        } else {
          SetFriendStatus("Add Friend");
        }
      });
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(summaryApi.user.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActiveUserId(response.data.user._id);
        handleFriendStatus();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserProfile();
  }, [friendStatus]);

  const navigate = useNavigate();
  console.log(activeUserId, "Active UserID");
  console.log(_id, "Shown Profile ID");
  console.log(friendRequests);
  console.log(requestedFriends);

  const handleNavigation = (id) => {
    if (activeUserId == id) {
      navigate(`/profile`);
      window.location.reload();
    } else {
      navigate(`/profile/${id}`);
      window.location.reload();
    }
  };
  const friendsCount = friends.length;

  const handleFriend = async () => {
    if (friendStatus == "Add Friend") {
      try {
        await sendFriendRequest(_id);
        SetFriendStatus("Request Sent");
        toast.success("Friend request sent!");
      } catch (error) {
        toast.error("Failed to send friend request.");
      }
    } else if (friendStatus == "Accept Request") {
      handleAcceptRequest(_id, setReceivedRequests);
    }
  };

  return (
    <>
      <div className="w-96 bg-white rounded-3xl  overflow-hidden">
        {/* Profile Image */}
        <div className="flex justify-center pt-6">
          <img
            className="w-36 h-26 rounded-lg"
            //need to changed later after fixing uploading
            src={_id ? summaryApi.domain.url + "/" + profilePic : ""}
            alt={`${name}'s profile`}
          />
        </div>

        {/* Name and Username */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>

        {/* Posts and Friends */}
        <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-600">
          <div className="text-center">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="font-bold">{postsCount}</span>
              <p>Posts</p>
            </div>
          </div>
          <Link to="/friends">
            <div className="text-center">
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="font-bold">{friendsCount}</span>
                <p>Friends</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {/* Check if the logged-in user is viewing their own profile */}
          {activeUserId !== _id && (
            <>
              {/* Show "Friends" button if they are already friends */}
              {friends.some((friend) => friend._id === activeUserId) ? (
                <button className="bg-green-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Friends
                </button>
              ) : (
                // Show "Add Friend" or "Accept Request" based on the friend status
                <button
                  className="bg-green-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                  onClick={handleFriend}
                >
                  {friendStatus}
                </button>
              )}
            </>
          )}

          {/* Messaging and Settings buttons always appear */}
          <Link to="/chat">
            <button className="p-3">
              <FaRegEnvelope size={26} />
            </button>
          </Link>
          <Link to="/settings">
            <button className="border-2 border-gray-200 p-4 rounded-lg">
              <FaEllipsisV size={11.5} />
            </button>
          </Link>
        </div>

        {/* About Section */}
        <div className="text-left px-10 py-12">
          <h3 className="text-sm font-semibold text-gray-700 font-serif">
            ABOUT
          </h3>

          {/* Flex container for the icon and country name */}
          <div className="flex items-center">
            <FaFlag size={18} className="mr-3" />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              {country}
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendar size={18} className="mr-3" />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              {birthDate.split("T")[0]}
            </p>
          </div>
        </div>

        {/* Friends List */}
        <div className="px-10 py-4">
          <Link to="/friends">
            <h3 className="text-sm font-semibold text-gray-700 font-serif mb-4">
              Friends
            </h3>
          </Link>
          <div className="flex space-x-2">
            <div className="grid grid-cols-5 gap-4 ">
              {friends.map((friend, index) => (
                <div key={index} onClick={() => handleNavigation(friend._id)}>
                  <img
                    key={index}
                    className="w-18 h-12 rounded-lg"
                    src={
                      friend._id
                        ? summaryApi.domain.url + "/" + friend.profilePic
                        : ""
                    }
                    alt={friend.name}
                    title={friend.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

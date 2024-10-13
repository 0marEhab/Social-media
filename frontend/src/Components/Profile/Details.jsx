import React, { useEffect, useState } from "react";
import {
  FaRegEnvelope,
  FaEllipsisV,
  FaFlag,
  FaCalendar,
  FaLinkedin,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../../common/index";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  sendFriendRequest,
  handleAcceptRequest,
  handleDeleteFriend,
  handleUnsendRequest,
} from "../../Utils/friends";

export default function Details({
  _id,
  name,
  email,
  birthDate,
  country,
  friends,
  profilePic,
  postsCount,
  friendRequests,
  requestedFriends,
  linkedProfile,
}) {
  const [activeUserId, setActiveUserId] = useState("");
  const [activeUser, setActiveUser] = useState();
  const [friendStatus, setFriendStatus] = useState("");
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showCancelOption, setShowCancelOption] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [recivedRequests, setRecivedRequests] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(summaryApi.user.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActiveUser(response.data.user);
        setActiveUserId(response.data.user._id);
        setSentRequests(response.data.user.requestedFriends);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (activeUserId) {
      handleFriendStatus();
    }
  }, [activeUserId]);

  const handleNavigation = (id) => {
    if (activeUserId === id) {
      navigate(`/profile`);
    } else {
      navigate(`/profile/${id}`);
    }
    window.location.reload();
  };

  const handleFriendStatus = () => {
    if (activeUserId === _id) {
      setFriendStatus("");
      return;
    }

    if (activeUser.requestedFriends.some((requestID) => requestID === _id)) {
      setFriendStatus("Request Sent");
      setShowCancelOption(true);
    } else if (
      activeUser.friendRequests.some((requestID) => requestID === _id)
    ) {
      setFriendStatus("Accept Request");
    } else if (friends.some((friend) => friend._id === activeUserId)) {
      setFriendStatus("Friends");
      setShowDeleteOption(false);
    } else {
      setFriendStatus("Add Friend");
      setShowCancelOption(false);
    }
  };

  const handleFriend = async () => {
    if (friendStatus === "Add Friend") {
      await sendFriendRequest(_id);
      setFriendStatus("Request Sent");
      setSentRequests((prev) => [...prev, { _id }]);
      toast.success("Friend request sent!");
    } else if (friendStatus === "Accept Request") {
      await handleAcceptRequest(_id, setRecivedRequests);
      setFriendStatus("Friends");
    } else if (friendStatus === "Request Sent") {
      await handleUnsendRequest(_id, setSentRequests);
      setFriendStatus("Add Friend");
      setShowCancelOption(false);
      toast.success("Friend request canceled!");
    }
  };

  const handleDelete = async () => {
    await handleDeleteFriend(_id);
    setFriendStatus("Add Friend");
    setShowDeleteOption(false);
  };

  const handleCancelRequest = async () => {
    await handleUnsendRequest(_id, setSentRequests);
    setFriendStatus("Add Friend");
    setShowCancelOption(false);
  };

  const toggleDeleteOption = () => {
    setShowDeleteOption((prev) => !prev);
  };

  const toggleCancelOption = () => {
    setShowCancelOption((prev) => !prev);
  };

  const friendsCount = friends.length;

  return (
    <div className="w-96 bg-white rounded-3xl dark:bg-darkBg dark:text-bg   overflow-hidden   shadow-lg shadow-slate-400 ">
      {/* Profile Image */}
      <div className="flex justify-center pt-6">
        <img
          className="w-36 h-36 rounded-lg object-cover"
          src={_id ? `${summaryApi.domain.url}/${profilePic}` : ""}
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
          <span className="font-bold">{postsCount}</span> <p>Posts</p>
        </div>
        <Link to="/friends">
          <div className="text-center">
            <span className="font-bold">{friendsCount}</span> <p>Friends</p>
          </div>
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        {activeUserId !== _id && (
          <>
            {friendStatus === "Friends" ? (
              <>
                {!showDeleteOption ? (
                  <button
                    className="bg-green-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                    onClick={toggleDeleteOption}
                  >
                    Friends
                  </button>
                ) : (
                  <button
                    className="bg-red-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                    onClick={handleDelete}
                  >
                    Remove Friend
                  </button>
                )}
              </>
            ) : friendStatus === "Request Sent" ? (
              <>
                {!showCancelOption ? (
                  <button
                    className="bg-yellow-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                    onClick={toggleCancelOption}
                  >
                    Request Sent
                  </button>
                ) : (
                  <button
                    className="bg-red-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                    onClick={handleCancelRequest}
                  >
                    Cancel Request
                  </button>
                )}
              </>
            ) : (
              <button
                className="bg-green-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center"
                onClick={handleFriend}
              >
                {friendStatus}
              </button>
            )}
          </>
        )}
        <Link to="/chat">
          <button className="p-3">
            <FaRegEnvelope className="hover:text-[#8588F0] " size={26} />
          </button>
        </Link>
        <Link to="/settings">
          <button className="border-2 border-gray-200 p-3 rounded-lg">
            <FaEllipsisV className="hover:text-[#8588F0]" size={18} />
          </button>
        </Link>
      </div>

      {/* About Section */}
      <div className="text-left px-10 py-12">
        <h3 className="text-sm font-semibold text-[#8588F0] font-serif">
          ABOUT
        </h3>
        <div className="flex items-center">
          <FaFlag size={18} className="mr-3 mt-2" />
          <p className="text-sm text-gray-600 mt-2 font-semibold">{country}</p>
        </div>
        <div className="flex items-center">
          <FaCalendar size={18} className="mr-3 mt-2" />
          <p className="text-sm text-gray-600 mt-2 font-semibold">
            {birthDate.split("T")[0]}
          </p>
        </div>
        {linkedProfile && (
          <a
            href={
              linkedProfile.startsWith("http")
                ? linkedProfile
                : `https://${linkedProfile}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black mt-2 font-semibold hover:text-blue-500"
          >
            <div className="flex items-center">
              <FaLinkedin size={18} className="mr-3 mt-2" />
              <p className="text-sm text-gray-600 mt-2 font-semibold">
                {linkedProfile}
              </p>
            </div>
          </a>
        )}
      </div>

      {/* Friends List */}
      <div className="px-10 py-4">
        <Link to="/friends">
          <h3 className="text-sm font-semibold text-[#8588F0] font-serif mb-4">
            Friends
          </h3>
        </Link>
        <div className="max-h-[300px] overflow-y-hidden hover:overflow-y-auto  rounded-lg transition-all duration-300">
          {" "}
          {/* Scrollbar appears on hover */}
          {friends.length > 0 ? (
            friends.slice(0, 5).map((friend) => (
              <div
                key={friend._id}
                className="flex items-center rounded-full p-4 w-full mt-2 cursor-pointer bg-black hover:bg-[#8588F0] hover:text-white"
                onClick={() => handleNavigation(friend._id)}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  src={`${summaryApi.domain.url}/${friend.profilePic}`}
                  alt={`${friend.name}'s profile`}
                />
                <p className="text-white">{friend.name}</p>
              </div>
            ))
          ) : (
            <p className="text-white mt-2">No friends available</p>
          )}
        </div>
      </div>
    </div>
  );
}

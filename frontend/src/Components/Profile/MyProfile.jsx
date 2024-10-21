import React, { useContext, useEffect, useReducer, useState } from "react";
import Photos from "./Photos";
import Post from "./Post";
import Videos from "./Videos";
import Details from "./Details";
import { FaAngleLeft } from "react-icons/fa";
import summaryApi from "../../../common/index";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "../Layout/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_POSTS":
      return { ...state, activeTab: "posts" };
    case "SHOW_PHOTOS":
      return { ...state, activeTab: "photos" };
    case "SHOW_VIDEOS":
      return { ...state, activeTab: "videos" };
    case "SHOW_EVENTS":
      return { ...state, activeTab: "events" };
    default:
      return state;
  }
};

export default function Profile() {
  const [state, dispatch] = useReducer(reducer, { activeTab: "posts" });
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [activeUser, setActiveUser] = useState();
  const [activeUserID, setActiveUserID] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(summaryApi.user.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.user);
        setActiveUserID(response.data.user._id);
        // If no 'id' param is provided or the current user is viewing their own profile
        if (!id || response.data.user._id === id) {
          setActiveUser(true); // User is viewing their own profile
        } else {
          setActiveUser(false); // User is viewing someone else's profile
        }
        console.log(activeUserID, "Profile updated");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserById = async (userId) => {
      try {
        const token = localStorage.getItem("token");

        const [userResponse, activeUserResponse] = await Promise.all([
          axios.get(`${summaryApi.user.url}/${userId}`, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
          axios.get(summaryApi.user.url, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
        ]);

        setActiveUserID(activeUserResponse.data.user._id);
        setData(userResponse.data.user);

        // If the fetched profile is not the active user's profile
        setActiveUser(
          userResponse.data.user._id === activeUserResponse.data.user._id
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!id) {
      fetchUserProfile();
    } else {
      fetchUserById(id);
    }
  }, [id, activeUserID]);

  if (!data) {
    return <Loading color={"#666AEC"} />;
  }

  // Destructure user data
  const {
    _id,
    name,
    email,
    birthDate,
    country,
    isAdmin,
    createdAt,
    updatedAt,
    friendRequests,
    friends,
    notifications,
    posts,
    profilePic,
    requestedFriends,
    linkedProfile = "",
  } = data;

  const postsCount = posts.length;
  return (
    <>
      <div className="bg-gray-100 dark:bg-darkBg mt-20 min-h-screen">
        {/* Button above Details */}
        <div className="ml-20 ">
          <Link to="/">
            <button className=" hover:text-white hover:bg-[#3d3f8b] duration-200 font-serif bg-slate-800 text-white font-semibold px-4 py-2 rounded-2xl w-36 h-16 mb-8 flex items-center justify-center space-x-2">
              <FaAngleLeft size={24} />
              <span>Back</span>
            </button>
          </Link>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-28">
            {/* Left Column: Details */}
            <div className="flex flex-col lg:w-1/4 w-full mt-10 lg:mt-10 lg:items-start">
              <div className="w-full lg:max-w-xs mx-auto lg:mx-0 ">
                <Details
                  _id={_id}
                  name={name}
                  email={email}
                  birthDate={birthDate}
                  country={country}
                  friends={friends}
                  profilePic={profilePic}
                  postsCount={postsCount}
                  activeUser={activeUser}
                  friendRequests={friendRequests}
                  requestedFriends={requestedFriends}
                  linkedProfile={linkedProfile}
                />
              </div>
            </div>

            {/* Right Column: Content Sections */}
            <div className="lg:w-3/4 dark:bg-darkBg dark:text-bg w-full mt-10 mb-10 bg-white rounded-l-3xl shadow-lg shadow-slate-400  ">
              {/* Tabs: Posts, Photos, Videos, Events */}
              <div className="px-6 py-6">
                <div className="flex space-x-6 text-gray-500 font-bold mt-4 mb-11">
                  <span
                    className={`hover:text-[#8588F0] cursor-pointer ${
                      state.activeTab === "posts" ? "text-[#8588F0]" : ""
                    }`}
                    onClick={() => dispatch({ type: "SHOW_POSTS" })}
                  >
                    Posts
                  </span>
                  <span
                    className={`hover:text-[#8588F0] cursor-pointer ${
                      state.activeTab === "photos" ? "text-[#8588F0]" : ""
                    }`}
                    onClick={() => dispatch({ type: "SHOW_PHOTOS" })}
                  >
                    Photos
                  </span>
                  <span
                    className={`hover:text-[#8588F0] cursor-pointer ${
                      state.activeTab === "videos" ? "text-[#8588F0]" : ""
                    }`}
                    onClick={() => dispatch({ type: "SHOW_VIDEOS" })}
                  >
                    Videos
                  </span>
                </div>
              </div>

              {state.activeTab === "posts" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  {posts.length > 0 ? (
                    posts.map((post, index) => {
                      if (
                        post.privacy === "public" ||
                        (post.privacy === "friends" &&
                          (activeUser === true ||
                            friends.some(
                              (friend) => friend._id === activeUserID
                            ))) ||
                        (activeUser === true && post.privacy === "private")
                      ) {
                        return (
                          <Post
                            key={post._id}
                            post={post}
                            profilePic={profilePic}
                            name={name}
                            className="w-full h-full"
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      There are no Posts 📫 to show. 😥
                    </p>
                  )}
                </div>
              )}

              {state.activeTab === "photos" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  {posts.length > 0 ? (
                    posts.map((post) => {
                      if (
                        activeUser || // Show all photos if the active user is viewing their own profile
                        post.privacy === "public" ||
                        (post.privacy === "friends" &&
                          friends.some(
                            (friend) => friend._id === activeUserID
                          )) ||
                        (activeUser && post.privacy === "private") // Only show private photos to the profile owner
                      ) {
                        // Check if the post has photos
                        if (post.media && post.media.photo) {
                          return (
                            <Photos
                              key={post._id}
                              photo={post.media.photo}
                              id={post._id}
                              className="w-full h-full"
                            />
                          );
                        }
                      }
                      return null;
                    })
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      There are no Photos 📷 to show. 😥
                    </p>
                  )}
                </div>
              )}

              {state.activeTab === "videos" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  {posts.length > 0 ? (
                    posts.map((post) => {
                      if (
                        activeUser || // Show all videos if the active user is viewing their own profile
                        post.privacy === "public" ||
                        (post.privacy === "friends" &&
                          friends.some(
                            (friend) => friend._id === activeUserID
                          )) ||
                        (activeUser && post.privacy === "private") // Only show private videos to the profile owner
                      ) {
                        // Check if the post has videos
                        if (post.media && post.media.video) {
                          return (
                            <Videos
                              key={post._id}
                              video={post.media.video}
                              id={post._id}
                              className="w-full h-full"
                            />
                          );
                        }
                      }
                      return null;
                    })
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      There are no Videos 📽 to show. 😥
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
          
    </>
  );
}

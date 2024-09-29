import React, { useContext, useEffect, useReducer, useState } from 'react';
import Photos from "./Photos";
import Post from './Post';
import Videos from './Videos';
import Details from './Details';
import { FaAngleLeft } from "react-icons/fa";
import summaryApi from "../../../common/index";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Layout/Loading';


const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_POSTS':
      return { ...state, activeTab: 'posts' };
    case 'SHOW_PHOTOS':
      return { ...state, activeTab: 'photos' };
    case 'SHOW_VIDEOS':
      return { ...state, activeTab: 'videos' };
    case 'SHOW_EVENTS':
      return { ...state, activeTab: 'events' };
    default:
      return state;
  }
};

export default function Profile() {
  const [state, dispatch] = useReducer(reducer, { activeTab: 'posts' });
  const [data, setData] = useState(null);
  const { id } = useParams(); 
  const [activeUser,setActiveUser]=useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(summaryApi.user.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.user, "Steven");

        setData(response.data.user);
        setActiveUser(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserById = async (userId) => {
    
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    
        // Make the request with the Authorization header
        const response = await axios.get(`${summaryApi.user.url}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log(response.data.user, "Steven");
        setData(response.data.user);
        setActiveUser(false);
    
      } catch (error) {
        console.error("Error fetching user data:", error);
    
        // Fallback to fetching the profile if the user-specific request fails
        fetchUserProfile();
        setActiveUser(true);
        throw error;
      }
    };
    


if(!id){
    fetchUserProfile();
    
}else{
    fetchUserById(id);
}
  }, []);

  if (!data) {
    return <Loading color={"#666AEC"}/>;
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
  } = data;

  const postsCount=posts.length;
 

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-28">
            {/* Left Column: Details */}
            <div className="flex flex-col lg:w-1/4 w-full mt-10 lg:mt-20 lg:items-start">
              {/* Button above Details */}
              <div className="mb-4 lg:mb-0">
                <Link to="/">
                <button className="font-serif bg-gray-200 text-gray-500 font-semibold px-4 py-2 rounded-2xl w-36 h-16 mb-8 flex items-center justify-center space-x-2">
                  <FaAngleLeft 
                    size={24}
                  />
                  <span>Back</span>
                </button>
              </Link>

              </div>
              <div className="w-full lg:max-w-xs mx-auto lg:mx-0">
              
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
                  requestedFriends={requestedFriends} />
              </div>
            </div>

            {/* Right Column: Content Sections */}
            <div className="lg:w-3/4 w-full mt-10 bg-white rounded-l-3xl	">
              {/* Tabs: Posts, Photos, Videos, Events */}
              <div className="px-6 py-6">
                <div className="flex space-x-6 text-gray-500 font-bold mt-4 mb-11">
                  <span
                    className={`hover:text-black cursor-pointer ${state.activeTab === 'posts' ? 'text-black' : ''}`}
                    onClick={() => dispatch({ type: 'SHOW_POSTS' })}
                  >
                    Posts
                  </span>
                  <span
                    className={`hover:text-black cursor-pointer ${state.activeTab === 'photos' ? 'text-black' : ''}`}
                    onClick={() => dispatch({ type: 'SHOW_PHOTOS' })}
                  >
                    Photos
                  </span>
                  <span
                    className={`hover:text-black cursor-pointer ${state.activeTab === 'videos' ? 'text-black' : ''}`}
                    onClick={() => dispatch({ type: 'SHOW_VIDEOS' })}
                  >
                    Videos
                  </span>
                  <span
                    className={`hover:text-black cursor-pointer ${state.activeTab === 'events' ? 'text-black' : ''}`}
                    onClick={() => dispatch({ type: 'SHOW_EVENTS' })}
                  >
                    Events
                  </span>
                </div>
              </div>

              {state.activeTab === 'posts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6 ">
              {posts.map((post, index) => (
                (post.privacy === "public" || 
                  ((post.privacy === "friends"&& friends.some(friend => friend._id === activeUser?._id) )|| 
                (activeUser==true && post.privacy==="private"))) && (
                  <Post 
                    key={index} 
                    post={post} 
                    profilePic={profilePic} 
                    name={name} 
                    className="w-full h-full" 
                  />
                )
              ))}
            </div>
            
              )}
              {state.activeTab === 'photos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  {posts.map((post, index) => (
                    //friends privacy needs to be tried! NOTE!!!!
                ((post.privacy === "public" || 
                  ((post.privacy === "friends" ) && friends.some(friend => friend._id === activeUser?._id)) || 
                  (activeUser==true && post.privacy==="private") ) && 
                  ((post.media?Object.keys(post.media):["text"])=="photo")) && (
                  <Photos 
                    photo={post.media.photo} 
                    className="w-full h-full" 
                  />
                )
              ))}
                </div>
              )}
              {state.activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
           {posts.map((post, index) => (
                ((post.privacy === "public" || 
                  ((post.privacy === "friends" ) && friends.some(friend => friend._id === activeUser?._id)) || 
                (activeUser==true && post.privacy==="private")) && 
                ((post.media?Object.keys(post.media):["text"])=="video")) && (
                  <Videos 
                    video={post.media.video} 
                    className="w-full h-full" 
                  />
                )
              ))}
                </div>
              )}
              {state.activeTab === 'events' && (
                <div className="w-full h-64 px-6 pb-6">
                  <p>
                    Events content goes here...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

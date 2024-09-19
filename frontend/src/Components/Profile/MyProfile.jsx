import React, { useReducer } from 'react';
import Photos from "./Photos";
import Post from './Post';
import Videos from './Videos';
import Details from './Details';
import { FaAngleLeft } from "react-icons/fa";

// Reducer function to handle visibility
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
  // Initial state with 'posts' as default
  const [state, dispatch] = useReducer(reducer, { activeTab: 'posts' });

  return (
    <>
      {/* Outer container with gray background covering sides and top */}
      <div className="bg-gray-100 min-h-screen">
        {/* Inner container centered with white content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-28">
            {/* Left Column: Details */}
            <div className="flex flex-col lg:w-1/4 w-full mt-10 lg:mt-20 lg:items-start">
              {/* Button above Details */}
              <div className="mb-4 lg:mb-0">
              <button className="font-serif bg-gray-200 text-gray-500 font-semibold px-4 py-2 rounded-2xl w-36 h-16 mb-8 flex items-center justify-center space-x-2">
                <FaAngleLeft size={24}/>
                <span>Back</span>
              </button>

              </div>
              {/* Center Details on mobile screens */}
              <div className="w-full lg:max-w-xs mx-auto lg:mx-0">
                <Details />
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

              {/* Content Rendering Based on Active Tab */}
              {state.activeTab === 'posts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                  <Post className="w-full h-full" />
                </div>
              )}
              {state.activeTab === 'photos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                  <Photos className="w-full h-full" />
                </div>
              )}
              {state.activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                  <Videos className="w-full h-full" />
                </div>
              )}
              {state.activeTab === 'events' && (
                <div className="w-full h-full px-6 pb-6">
                  <p>Events content goes here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisV } from 'react-icons/fa'; 
import { formatDistanceToNow } from 'date-fns';

export default function Post({ post }) {
  const userProfilePic = "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9290037d-a5b2-4f50-aea3-9f3f2b53b441";
  const userProfileName = "Jane";

  // Example post data; assume `post` prop contains the actual post data
  const examplePost = {
    content: `We completed the 30-Day Running Streak Challenge! 🏃‍♀️🎉\n
              It was a tough journey, but we pushed through every day. \n
              The feeling of accomplishment at the end was worth it. \n
              Here's to many more challenges and achieving new goals! \n
              Thanks to everyone who supported us along the way. \n
              Stay tuned for more updates and challenges!`,
    likes: [],
    comments: [],
    photo: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/bef54506-ea45-4e42-a1b6-23a48f61c5e8",
    video: "",
    tags: [],
    privacy: "public",
    postType: "photo",
    sharedPost: null,
    user: "user_id_example",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(examplePost.likes.length);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleEdit = () => {
    // Implement the edit logic here
    alert("Edit action clicked!");
  };

  const handleDelete = () => {
    // Implement the delete logic here
    alert("Delete action clicked!");
  };

  const handleContentToggle = () => {
    setShowFullContent(!showFullContent);
  };

  const maxLines = 3; // Define how many lines to show before truncating
  const lines = examplePost.content.split('\n');
  const shouldShowReadMore = lines.length > maxLines;
  const displayedContent = showFullContent ? examplePost.content : lines.slice(0, maxLines).join('\n') + (shouldShowReadMore ? '...' : '');

  return (
    <div className="col-span-1">
  <div className="bg-white rounded-3xl border-2 border-gray-200 p-14 flex flex-col justify-between">
        <div className="flex items-center mb-4">
          <div className="flex-1 flex items-center">
            <img
              src={userProfilePic}
              alt="User profile"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="ml-2">
              <h2 className="font-bold">{userProfileName}</h2>
              <p className="text-gray-500 text-xs font-light">
                {formatDistanceToNow(new Date(examplePost.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          {/* Three dots menu */}
          <div className="relative">
            <FaEllipsisV
              className="text-gray-600 cursor-pointer"
              onClick={() => setMenuVisible(!menuVisible)}
            />
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Conditionally render based on content type */}
        {examplePost.postType === 'photo' && (
          <img
          className="w-full h-auto rounded-lg object-cover mb-3 max-h-[300px]"
          src={examplePost.photo}
            alt="Post content"
          />
          
          
        )}
        {examplePost.postType === 'video' && (
          <video
            className="w-full h-auto rounded-lg mb-3"
            controls
          >
            <source src={examplePost.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          

          
          
        )}
        {examplePost.postType === 'text' && (
          <p className="text-sm mb-4">
            {displayedContent}
            {shouldShowReadMore && (
              <button
                className="text-blue-500 ml-1"
                onClick={handleContentToggle}
              >
                {showFullContent ? 'Read Less' : 'Read More'}
              </button>
            )}
          </p>
        )}
              <p className="text-sm mb-4">
            {displayedContent}
            {shouldShowReadMore && (
              <button
                className="text-blue-500 ml-1"
                onClick={handleContentToggle}
              >
                {showFullContent ? 'Read Less' : 'Read More'}
              </button>
            )}
          </p>

        

        {/* Like, comment, and share section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Heart for likes */}
            <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLike}>
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
              <span className="text-sm">{likeCount}</span>
            </div>
            {/* Comment icon */}
            <div className="flex items-center space-x-1">
              <FaRegComment className="text-gray-600" />
              <span className="text-sm">{examplePost.comments.length}</span>
            </div>
          </div>
          {/* Share button */}
          <div className="flex items-center space-x-1 cursor-pointer">
          <p className="text-sm font-semibold	">Share</p>
          <FaShare className="text-gray-600" />
  </div>
        </div>
      </div>
    </div>
  );
}

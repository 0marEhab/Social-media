import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaEllipsisV,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import summaryApi from "../../../common/index";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Post({ post, profilePic, name, user }) {
  const userProfilePic =
    "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9290037d-a5b2-4f50-aea3-9f3f2b53b441";
  const userProfileName = "Jane";

  const examplePost = {
    id: post._id,
    content: post.content,
    likes: post.likes.length,
    comments: post.comments.length,
    media: post.media ? Object.keys(post.media) : ["text"],
    privacy: post.privacy,
    user: post.user,
    createdAt: post.createdAt,
  };
  // Check if the current user has already liked the post
  const userHasLiked = post.likes.some((like) => like._id === user);

  const [liked, setLiked] = useState(userHasLiked);
  const [likeCount, setLikeCount] = useState(examplePost.likes);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        summaryApi.like.url.replace(":id", examplePost.id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Toggle the liked state
      setLiked(!liked);

      // Update the like count based on the response
      setLikeCount(response.data.likes.length);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleContentToggle = () => {
    setShowFullContent(!showFullContent);
  };

  function addNewlinesAfterEverySixWordsOrLongWords(
    text,
    maxWordLength = 10,
    longWordLimit = 53
  ) {
    const words = text.split(" ");
    const result = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longWordLimit) {
        for (let j = 0; j < words[i].length; j += longWordLimit) {
          result.push(words[i].substring(j, j + longWordLimit));
        }
      } else {
        result.push(words[i]);
      }
      if ((i + 1) % 6 === 0) {
        result.push("\n");
      }
    }

    return result.join(" ");
  }

  const formattedText = addNewlinesAfterEverySixWordsOrLongWords(
    examplePost.content
  );
  const maxLines = 3;
  const lines = formattedText.split("\n");
  const shouldShowReadMore = lines.length > maxLines;
  const displayedContent = showFullContent
    ? formattedText
    : lines.slice(0, maxLines).join("\n") + (shouldShowReadMore ? "..." : "");

  return (
    <div className="col-span-1">
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-14 flex flex-col justify-between">
        <div className="flex items-center mb-4 ">
          <div className="flex-1 flex items-center">
            <img
              src={summaryApi.domain.url + "/" + profilePic}
              alt="User profile"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="ml-2">
              <h2 className="font-bold">{name}</h2>
              <p className="text-gray-500 text-xs font-light">
                {formatDistanceToNow(new Date(examplePost.createdAt), {
                  addSuffix: true,
                })}
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
                <Link to={`/posts/${examplePost.id}`}>
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Edit
                  </button>
                </Link>
                <Link to={`/posts/${examplePost.id}`}>
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Delete
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Conditionally render based on content type */}
        <Link to={`/posts/${examplePost.id}`}>
          {examplePost.media[0] === "photo" && (
            <img
              className="w-full h-auto rounded-lg object-cover mb-3 max-h-[300px]"
              src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
              alt="Post content"
            />
          )}
        </Link>

        <Link to={`/posts/${examplePost.id}`}>
          {examplePost.media[0] === "video" && (
            <video
              className="w-full h-auto rounded-lg mb-3"
              style={{
                width: "480px",
                height: "300px",
              }}
              controls
            >
              <source
                src={`${summaryApi.domain.url}/uploads/${post.media.video}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </Link>

        <Link to={`/posts/${examplePost.id}`}>
          {examplePost.media[0] === "text" && (
            <p className="text-sm mb-4">
              {shouldShowReadMore && (
                <button
                  className="text-blue-500 ml-1"
                  onClick={handleContentToggle}
                >
                  {showFullContent ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          )}
        </Link>

        <Link to={`/posts/${examplePost.id}`}>
          <p className="text-sm mb-4">
            {displayedContent}
            {shouldShowReadMore && (
              <button
                className="text-blue-500 ml-1"
                onClick={handleContentToggle}
              >
                {showFullContent ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </Link>

        {/* Like, comment, and share section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Heart for likes */}
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleLike}
            >
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
              <span className="text-sm">{likeCount}</span>
            </div>
            {/* Comment icon */}
            <Link to={`/posts/${examplePost.id}`}>
              <div className="flex items-center space-x-1">
                <FaRegComment className="text-gray-600" />
                <span className="text-sm">{examplePost.comments}</span>
              </div>
            </Link>
          </div>
          {/* Share button */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <p className="text-sm font-semibold">Share</p>
            <FaShare className="text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

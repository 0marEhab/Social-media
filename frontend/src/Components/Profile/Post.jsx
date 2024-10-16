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
// console.log(post);
  const userHasLiked = post.likes.some((like) => like._id === user);

  const [liked, setLiked] = useState(userHasLiked);
  const [likeCount, setLikeCount] = useState(examplePost.likes);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const MAX_WORDS = 10;
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
      setLiked(!liked);
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
    longWordLimit = 50
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

  const truncateText = (text) => {
    const words = text.split(" ");
    return words.length > MAX_WORDS
      ? words.slice(0, MAX_WORDS).join(" ") + "..."
      : text;
  };

  const displayedContent = showFullContent
    ? examplePost.content // Full content if "Read More" is clicked
    : truncateText(examplePost.content); // Truncated content

  return (
    <div className="col-span-1  ">
      <div className="bg-white dark:bg-darkBg rounded-3xl border-2  border-gray-200 p-6 flex flex-col justify-between">
        <div className="flex items-center mb-4">
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
                  <button className="hover:text-[#8588F0] rounded-lg hover:border border-[#8588F0] block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Edit
                  </button>
                </Link>
                <Link to={`/posts/${examplePost.id}`}>
                  <button className="hover:text-[#8588F0] rounded-lg hover:border border-[#8588F0] block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Delete
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Conditionally render media */}
        <Link to={`/posts/${examplePost.id}`}>
          {examplePost.media[0] === "photo" && (
            <img
              className="w-full h-48 object-contain rounded-lg mb-3 transform transition-transform duration-300 hover:scale-110"
              src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
              alt="Post content"
            />
          )}
        </Link>

        <Link to={`/posts/${examplePost.id}`}>
          {examplePost.media[0] === "video" && (
            <video
              className="w-full h-48 object-cover rounded-lg mb-3 transform transition-transform duration-300 hover:scale-110"
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
            <div className="text-l mb-3 h-48 place-content-center pb-7 pl-2 overflow-hidden transform transition-transform duration-300 hover:scale-110">
              <p className="whitespace-pre-line">{displayedContent}</p>
              {examplePost.content.split(" ").length > MAX_WORDS && (
                <button
                  className="text-[#8588F0] ml-1"
                  onClick={handleContentToggle}
                >
                  {showFullContent ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          )}
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button onClick={handleLike}>
                {liked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500 hover:text-red-500" />
                )}
              </button>
              <span className="text-sm ml-1">{likeCount}</span>
            </div>
            <div className="flex items-center">
              <FaRegComment className="text-gray-500" />
              <span className="text-sm ml-1">{examplePost.comments}</span>
            </div>
            <div className="flex items-center">
              <FaShare className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

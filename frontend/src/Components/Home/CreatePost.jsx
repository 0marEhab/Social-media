import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";
import { useState, useRef } from "react";
import axios from "axios";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const [post, setPost] = useState({
    content: content,
    photo: "https://via.placeholder.com/350x300",
    video: "",
    comments: [],
    likes: [],
    // user: "",
    date: new Date(),
    privacy: "public",
    tags: [],
    postType: "text",
  });

  const createPost = async () => {
    try {
      const createdPost = {
        content: content,
        photo: post.photo,
        // user: user._id,
        date: post.date,
        privacy: post.privacy,
        tags: post.tags,
        postType: post.postType,
        comments: post.comments.length,
        likes: post.likes.length,
      };

      const response = await axios.post(
        "http://localhost:3000/api/posts",
        createdPost,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setContent(e.target.value);
  };

  const handleShare = (e) => {
    e.preventDefault();
    createPost();
    console.log(content);
    setContent("");
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-8 bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <form onSubmit={handleShare}>
        <div className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg"
            alt="user-profile"
            className="w-12 h-12 rounded-lg"
          />
          <textarea
            ref={textareaRef}
            value={content}
            onInput={handleInput}
            placeholder="What are you thinking?"
            className="w-full p-3 rounded-lg h-auto focus:outline-none resize-none overflow-hidden"
            rows={1}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 text-gray-500">
            <div className="bg-gray-200 px-2 py-2 rounded-lg hover:text-blue-500 cursor-pointer">
              <AiOutlineCamera size={20} />
            </div>
            <div className="bg-gray-200 px-2 py-2 rounded-lg hover:text-blue-500 cursor-pointer">
              <AiOutlineVideoCamera size={20} />
            </div>
            <div className="bg-gray-200 px-2 py-2 rounded-lg hover:text-blue-500 cursor-pointer">
              <AiOutlinePlus size={20} />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg flex gap-1 items-center"
          >
            Share <AiOutlineRight />
          </button>
        </div>
      </form>
    </div>
  );
}

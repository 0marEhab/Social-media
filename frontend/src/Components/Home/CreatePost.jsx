import { CgClose } from "react-icons/cg";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";

export default function CreatePost() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(""); // Add video state if needed
  const [tags, setTags] = useState([]); // State for tags
  const [privacy, setPrivacy] = useState("public"); // State for privacy
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("user", user._id);
      if (image) {
        const blob = await fetch(image).then((res) => res.blob());
        const file = new File([blob], "image.png", { type: "image/png" });
        formData.append("photo", file);
      }
      if (video) {
        formData.append("video", video);
      }
      formData.append("tags", JSON.stringify(tags));
      formData.append("privacy", privacy);

      const response = await axios.post(summaryApi.create.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Post created:", response.data);
      setContent("");
      setImage(null);
      setVideo("");
      setTags([]);
      setPrivacy("public");
      window.location.reload();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleShare = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="flex flex-col gap-8 bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <form onSubmit={handleShare}>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/30x30"
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
        {image && (
          <div className="mt-4 relative">
            <button
              className="absolute top-2 right-5 text-white"
              onClick={() => {
                setImage(null);
                fileInputRef.current.value = "";
              }}
            >
              <CgClose size={24} />
            </button>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full rounded-lg"
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 text-gray-500">
            <div
              className="bg-gray-200 px-2 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
              onClick={handleCameraClick}
            >
              <AiOutlineCamera size={20} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
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

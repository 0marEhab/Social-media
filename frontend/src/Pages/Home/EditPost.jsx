import { AiOutlineCamera, AiOutlineVideoCamera } from "react-icons/ai";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import summaryApi from "../../../common";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./../../Components/Layout/Loading";
import { CgClose } from "react-icons/cg";

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState(""); // New state for input tag
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const fileInputRef = useRef(null);
  const [post, setPost] = useState(null); // Initialize post as null

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          summaryApi.post.url.replace(":id", id),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);

        if (response.data) {
          setPost(response.data); // Set the whole post object
          setContent(response.data.content || ""); // Set content from post
          setPrivacy(response.data.privacy || "public"); // Set privacy from post
          setTags(response.data.tags || []); // Set tags from post

          // Handle media files if they exist
          if (response.data.media) {
            if (response.data.media.photo) {
              setImageFile(response.data.media.photo);
            }
            if (response.data.media.video) {
              setVideoFile(response.data.media.video);
            }
          }
        } else {
          throw new Error("Post data is undefined");
        }
      } catch (err) {
        toast.error("Error fetching post data.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImageFile(file);
      } else if (file.type.startsWith("video/")) {
        setVideoFile(file);
      }
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoClick = () => {
    fileInputRef.current.click();
  };

  const handleCloseVideo = (e) => {
    e.preventDefault();
    setVideoFile(null);
    fileInputRef.current.value = "";
  };

  const handleClosePhoto = (e) => {
    e.preventDefault();
    fileInputRef.current.value = "";
    setImageFile(null);
  };

  const handleTagsInput = (e) => {
    setTagsInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tagsInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagsInput.trim()]);
      setTagsInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("privacy", privacy);
    formData.append("tags", JSON.stringify(tags));

    if (imageFile) {
      formData.append("photo", imageFile);
    }
    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const response = await axios.put(
        summaryApi.update.url.replace(":id", id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // No need to specify 'Content-Type', browser handles it
          },
        }
      );

      toast.success("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (err) {
      toast.error("Error updating post.");
      console.error(err.response || err.message);
    }
  };

  if (loading) return <Loading color={"#000"} />;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} // Update content directly
            rows="4"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tagsInput}
            onChange={handleTagsInput}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag and press Enter"
            className="w-full border rounded-lg p-2"
          />
          <div className="flex gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer"
                onClick={() => handleRemoveTag(index)}
              >
                {tag} <CgClose className="inline ml-1" size={16} />
              </div>
            ))}
          </div>
        </div>
        <div>
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
              accept="image/*,video/*"
            />
            <div
              onClick={handleVideoClick}
              className="bg-gray-200 px-2 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
            >
              <AiOutlineVideoCamera size={20} />
            </div>
          </div>
          {post?.media?.photo ? (
            <div className="mt-4 relative">
              <button
                className="absolute top-2 right-5 z-50 text-white"
                onClick={handleClosePhoto}
              >
                <CgClose size={24} onClick={handleClosePhoto} />
              </button>
              <img
                src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
                alt="Preview"
                className="w-full max-h-[400px] rounded-lg"
              />
            </div>
          ) : (
            imageFile && (
              <div className="mt-4 relative">
                <button
                  className="absolute top-2 right-5 z-50 text-white"
                  onClick={handleClosePhoto}
                >
                  <CgClose size={24} />
                </button>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="max-w-full max-h-[400px] rounded-lg"
                />
              </div>
            )
          )}

          {post?.media?.video ? (
            <div className="mt-4 relative">
              <button
                className="absolute top-2 right-5 z-50 text-white"
                onClick={handleCloseVideo}
              >
                <CgClose size={24} />
              </button>
              <video
                controls
                src={`${summaryApi.domain.url}/uploads/${post.media.video}`}
                className="w-full max-h-[400px] rounded-lg"
              />
            </div>
          ) : (
            videoFile && (
              <div className="mt-4 relative">
                <button
                  className="absolute top-2 right-5 z-50 text-white"
                  onClick={handleCloseVideo}
                >
                  <CgClose size={24} />
                </button>
                <video
                  controls
                  src={URL.createObjectURL(videoFile)}
                  className="max-w-full max-h-[400px] rounded-lg"
                />
              </div>
            )
          )}
        </div>
        <div>
          <label htmlFor="privacy" className="block text-gray-700">
            Privacy
          </label>
          <select
            id="privacy"
            name="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Update Post
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditPost;

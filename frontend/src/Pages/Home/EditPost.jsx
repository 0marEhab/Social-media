import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import summaryApi from "../../../common";

const EditPost = () => {
  const { id } = useParams(); 
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({ content: "", photo: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setPost(response.data); 
      } catch (err) {
        setError("Error fetching post data.");
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(summaryApi.update.url.replace(":id", id), post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate(`/posts/${id}`); 
    } catch (err) {
      setError("Error updating post.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-gray-700">
            Photo URL
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={post.photo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

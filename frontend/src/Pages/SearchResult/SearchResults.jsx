import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../Components/Layout/SearchBar";
import PostCard from "../../Components/Home/PostCard";
import summaryApi from "../../../common";
import { Link } from "react-router-dom";
export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`http://127.0.0.1:3000/api/search?q=${query}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          setPosts(response.data.posts);
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [query]);
  console.log(posts);
  return (
    <div className="p-5">
      <SearchBar value={query} />
      <div className="flex space-x-5 border-b-2">
        <button
          className={`px-4 py-2 ${
            activeTab === "users"
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "posts"
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="mt-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="flex items-center border-b p-5" key={user._id}>
                <Link to={`/profile/${user._id}`}>
                  <img
                    src={summaryApi.domain.url + "/" + user.profilePic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <span className="font-semibold">{user.name}</span>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard post={post} key={post._id} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}

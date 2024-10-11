import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPager } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Components/Layout/Loading";
import axios from "axios";
import summaryApi from "../../../common";
<<<<<<< HEAD
import PostCard from "../../Components/DashBoard/postCard";
import SideBar from "../../Components/DashBoard/SideBar";
=======
import PostCard from "../../Components/DashBoard/PostCard";
import SideBar from "../../Components/DashBoard/NavBarDashboard";
import NavBarDashboard from "../../Components/DashBoard/NavBarDashboard";
>>>>>>> feature/admin

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportedPosts, setReportedPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(summaryApi.posts.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchReportedPosts = async () => {
      try {
        const response = await axios.get(summaryApi.reportedPosts.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReportedPosts(response.data.reportedPosts);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchReportedPosts();
  }, []);
  console.log(posts);
  console.log(reportedPosts);

  const content = posts.map((post) => <PostCard post={post} key={post.id} />);
  const reportedPost = reportedPosts.map((post) => (
    <PostCard post={post} key={post.id} />
  ));
  if (loading) {
    return <Loading color={"#666AEC"} />;
  }
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-100 p-10">
      <SideBar />
      <h1 className="text-xl font-semibold mb-2">DashBoard</h1>
      <p className="text-l mb-6">
        <FontAwesomeIcon icon={faPager} /> / posts
      </p>
      <div className="grid grid-cols-3 gap-6 ">{content}</div>
      <h1 className="text-xl font-semibold mt-10">
        {" "}
        <FontAwesomeIcon icon={faPager} /> / Reported Posts
      </h1>
      <div className="grid grid-cols-3 gap-6 mt-5 ">{reportedPost}</div>
    </div>
=======
    <div className="min-h-screen bg-gray-100 ">
      <NavBarDashboard />
      <div className='m-10'>
        <h1 className="text-xl font-semibold mb-2">DashBoard</h1>
        <p className="text-l mb-10 mt-10">
          <FontAwesomeIcon icon={faPager} /> / posts
        </p>
        <div className="flex justify-between gap-6 ">{content}</div>
        <h1 className="text-l mb-10 mt-10">
          {" "}
          <FontAwesomeIcon icon={faPager} /> / Reported Posts
        </h1>
        <div className="flex justify-between mt-5 ">{reportedPost}</div>
      </div>
      </div>
      
>>>>>>> feature/admin
  );
}

export default Posts;

import PostCard from "../../Components/Home/PostCard";
import CreatePost from "../../Components/Home/CreatePost";
import HomeSideBar from "../../Components/Home/HomeSideBar";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching the posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 bg-bg">
      <div className="col-span-11 md:col-span-8 lg:col-span-7 p-12 ">
        <CreatePost />
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
      <div className="col-span-11 md:col-span-8 lg:col-span-4 px-10">
        <HomeSideBar />
      </div>
    </div>
  );
};

export default Home;
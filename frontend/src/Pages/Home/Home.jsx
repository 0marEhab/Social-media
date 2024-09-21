import PostCard from "../../Components/Home/PostCard";
import CreatePost from "../../Components/Home/CreatePost";
import HomeSideBar from "../../Components/Home/HomeSideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./../../Components/Layout/Loading";
import summaryApi from "../../../common";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.error("Error fetching the posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 bg-bg">
      <div className="col-span-11 md:col-span-8 lg:col-span-7 p-12 ">
        <CreatePost />
        {loading ? (
          <Loading color={"#000"} />
        ) : (
          posts.map((post) => <PostCard post={post} key={post._id} />)
        )}
      </div>
      <div className="col-span-11 md:col-span-8 lg:col-span-4 px-10">
        <HomeSideBar />
      </div>
    </div>
  );
};

export default Home;

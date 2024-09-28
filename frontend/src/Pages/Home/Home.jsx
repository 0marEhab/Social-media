import PostCard from "../../Components/Home/PostCard";
import CreatePost from "../../Components/Home/CreatePost";
import HomeSideBar from "../../Components/Home/HomeSideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./../../Components/Layout/Loading";
import summaryApi from "../../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHomeSidebarOpen, setIsHomeSidebarOpen] = useState(false);

  const toggleHomeSidebar = () => {
    setIsHomeSidebarOpen(!isHomeSidebarOpen);
  };
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
    <div className="grid grid-cols-1 lg:grid-cols-11  bg-bg">
      <div className="col-span-11 md:col-span-8 lg:col-span-8 p-12 lg:ml-44  ">
        <CreatePost />
        {loading ? (
          <Loading color={"#000"} />
        ) : (
          posts.map((post) => <PostCard post={post} key={post._id} />)
        )}
      </div>
      <div
        className={`lg:hidden fixed flex justify-end bottom-0 right-0 z-10 w-full p-3 ${
          isHomeSidebarOpen ? "bg-transparent" : "bg-white shadow"
        }`}
      >
        <button
          onClick={toggleHomeSidebar}
          className="py-2 px-3  bg-secondary text-white rounded-md"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div
        className={`fixed lg:static ${
          isHomeSidebarOpen ? "block" : "hidden"
        } col-span-11 md:col-span-8 lg:block lg:col-span-3`}
      >
        <HomeSideBar />
      </div>
    </div>
  );
};
export default Home;

<<<<<<< HEAD
import PostCard from "../../Components/Home/PostCard";
import CreatePost from "../../Components/Home/CreatePost";
import HomeSideBar from "../../Components/Home/HomeSideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./../../Components/Layout/Loading";
import summaryApi from "../../../common";
import RightSideBar from "../../Components/Home/RightSideBar";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFriendsVisible, setIsFriendsVisible] = useState(true);
  const [friends, setFriends] = useState([]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 150) {
      setIsFriendsVisible(false);
    } else {
      setIsFriendsVisible(true);
    }
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
    console.log("scrolled");

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(summaryApi.myFriends.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="flex justify-between bg-gray-100 z-0 min-h-screen">
      {/* Left Sidebar */}
      <div className=" md:flex md:w-1/4 bg-white shadow-lg">
        <HomeSideBar />
      </div>

      <div className="flex justify-between items-start w-full md:w-3/4 lg:w-1/2 mx-auto p-8 space-x-8 overflow-hidden">
        <div
          className={`flex flex-col w-full space-y-6 transition-all duration-300 ${
            isFriendsVisible ? "lg:w-2/3" : "lg:translate-x-40"
          }`}
        >
          <CreatePost />
          {loading ? (
            <Loading color={"#000"} />
          ) : (
            posts.map((post) => <PostCard post={post} key={post._id} />)
          )}
        </div>

        <div
          className={`hidden md:flex flex-col space-y-5 bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 ${
            isFriendsVisible ? "translate-x-0" : "translate-x-[500px] "
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-600">Friends</h3>
          <div className="flex w-[200px] flex-col gap-3">
            {friends.map((friend) => (
              <Link to={`/profile/${friend._id}`}>
                <button
                  key={friend._id}
                  className="text-base flex justify-start p-2 w-[200px] rounded-lg bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-700 font-semibold"
                >
                  <img
                    src={summaryApi.domain.url + "/" + friend.profilePic}
                    alt=""
                    className="w-7 h-7 rounded-full mx-2"
                  />
                  {friend.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/4 bg-white shadow-lg">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
=======
import PostCard from "../../Components/Home/PostCard";
import CreatePost from "../../Components/Home/CreatePost";
import HomeSideBar from "../../Components/Home/HomeSideBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "./../../Components/Layout/Loading";
import summaryApi from "../../../common";
import RightSideBar from "../../Components/Home/RightSideBar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFriendsVisible, setIsFriendsVisible] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
   
    if (scrollPosition > 150) {
      setIsFriendsVisible(false);
    } else {
      setIsFriendsVisible(true);
    }
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
    console.log("scrolled")
  
    window.addEventListener("scroll", handleScroll);

  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-between bg-gray-100 z-0 min-h-screen">
      {/* Left Sidebar */}
      <div className=" md:flex md:w-1/4 bg-white shadow-lg">
        <HomeSideBar />
      </div>


      <div className="flex justify-between items-start w-full md:w-3/4 lg:w-1/2 mx-auto p-8 space-x-8 overflow-hidden">
  
        <div
          className={`flex flex-col w-full space-y-6 transition-all duration-300 ${
            isFriendsVisible ? "lg:w-2/3" : "lg:translate-x-40"
          }`}
        >
          <CreatePost />
          {loading ? (
            <Loading color={"#000"} />
          ) : (
            posts.map((post) => <PostCard post={post} key={post._id} />)
          )}
        </div>

 
        <div
          className={`hidden md:flex flex-col space-y-5 bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 ${
            isFriendsVisible ? "translate-x-0" : "translate-x-[500px] "
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-600">Friends</h3>
          <div className="flex flex-col gap-3">
            {["friend1", "friend2", "friend3", "friend4"].map((friend) => (
              <button
                key={friend}
                className="text-base flex justify-start p-2 w-[200px] rounded-lg bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-700 font-semibold"
              >
                {friend}
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="hidden lg:flex w-1/4 bg-white shadow-lg">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
>>>>>>> feature/admin

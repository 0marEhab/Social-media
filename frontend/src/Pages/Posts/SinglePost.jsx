import Post from "../../Components/SinglePost/Post";
import SinglePostSideBar from "../../Components/SinglePost/SinglePostSideBar";
import Loading from "../../Components/Layout/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import summaryApi from "../../../common";
import { useParams } from "react-router-dom";
export default function SinglePost() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          summaryApi.post.url.replace(":id", id),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data.comments);
        setLikes(response.data.comments.map((comment) => comment.likes.length));
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 bg-bg">
      <div className="col-span-11 md:col-span-8 lg:col-span-8 p-12 ">
        <Post />
      </div>
      <div className="col-span-11 md:col-span-8 lg:col-span-3 ">
        {loading ? (
          <Loading color={"#000"} />
        ) : (
          <SinglePostSideBar initialLikes={likes} initialComments={comments} />
        )}{" "}
      </div>
    </div>
  );
}

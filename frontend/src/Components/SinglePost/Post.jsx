import Swal from "sweetalert2"; // Import SweetAlert2
import { BsThreeDots } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState, useContext } from "react";
import axios from "axios"; // Assuming Axios for API calls
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import PostOptions from "../Home/PostOptions"; // Import the refactored dropdown component
import Loading from "../Layout/Loading";
import ArrowLeft from "../../Assets/Images/Arrow left.svg";
export default function Post() {
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState();
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(
    user ? likes?.some((like) => like._id === user._id) : false
  );
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (post && user) {
      setIsLiked(post.likes.some((like) => like._id === user._id));
    }
  }, [post, user]);

  if (post) {
    var relativeTime = moment(post.createdAt).fromNow();
  }

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
        setLikes(response.data.likes);
      } catch (error) {
        console.error("Error fetching the post", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        summaryApi.like.url.replace(":id", post._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked((prev) => !prev);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const reportPost = async () => {
    try {
      const response = await axios.post(
        summaryApi.reportPost.url.replace(":id", post._id),
        {
          userId: user._id,
          reportedReason: "Inappropriate Content", // Placeholder reason, update based on your radio input handling
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      Swal.fire("Reported!", "This post has been reported.", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        "Something went wrong with reporting the post.",
        "error"
      );
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const showLikesPopup = () => {
    const likesList = post.likes
      .map(
        (like) =>
          `<p style="cursor: pointer; color: blue ; text-decoration: underline;" onclick="window.location.href='/profile/${like._id}'">${like.name}</p>`
      )
      .join("");

    Swal.fire({
      title: "Likes",
      html: `<div style="text-align: left; margin-top: 10px">${likesList}</div>`, // Use HTML for formatting
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  if (!post) {
    return <Loading color={"#000"} />;
  }

  const editPost = () => {
    navigate(`/posts/edit/${post._id}`);
  };

  const deletePost = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(summaryApi.delete.url.replace(":id", post._id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire("Deleted!", "Your post has been deleted.", "success").then(
          () => {
            navigate("/");
          }
        );
      } catch (error) {
        console.error("Error deleting the post:", error);
        Swal.fire("Error", "Failed to delete the post.", "error");
      }
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(
        summaryApi.share.url.replace(":id", post._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire("Success", response.data.message, "success").then(() => {
        navigate(`/posts/${response.data.sharedPost._id}`);
      });
    } catch (error) {
      console.error("Error sharing the post:", error);
      Swal.fire("Error", "Failed to share the post.", "error");
    }
  };

  const popUpImage = () => {
    Swal.fire({
      imageUrl: summaryApi.domain.url + "/uploads/" + post.media.photo,
      imageAlt: "Image Preview", // Adding alt text for accessibility
      width: "80%", // Set the width of the popup to 80% of the viewport width
      heightAuto: false, // Disable automatic height adjustment
      background: "transparent", // Transparent background
      padding: "0", // Remove padding around the image
      customClass: {
        popup: "custom-popup", // Custom class for the popup
        image: "custom-image", // Custom class for the image
      },
      showCloseButton: true, // Show close button
      closeButtonHtml:
        '<span style="font-size: 30px; color: white;">&times;</span>', // Customize close button color
      showConfirmButton: false, // Hide confirm button
      backdrop: "rgba(0,0,0,0.8)", // Darker semi-transparent backdrop
    });
  };
  return (
    <div className="flex bg-[#FBFCFE] text-secondary p-10 lg:w-[800px] md:w-[500px] flex-col justify-start items-start shadow-lg rounded-md">
      <div className="opacity-65 bg-gray-200 w-24 h-14 rounded-xl bg-transparent flex justify-center items-center gap-3 mb-6 mt-6">
        <button
          className="text-xl flex gap-3 items-center"
          onClick={() => navigate(-1)}
        >
          <img src={ArrowLeft} className="w-12" /> Back
        </button>
      </div>

      <div className="flex flex-col justify-between items-start gap-3 lg:items-center lg:flex-row md:items-center md:flex-row w-full mb-10">
        <div className="flex items-center gap-3 ">
          <Link to={`/profile/${post.user._id}`}>
            {" "}
            <img
              src={summaryApi.domain.url + "/" + post.user.profilePic}
              alt={`${post.user.name}'s profile`}
              className="w-12 h-12 rounded-full clickableImage"
            />
          </Link>{" "}
          <div>
            <Link to={`/profile/${post.user._id}`}>
              <h4 className="font-bold hover:underline">{post.user.name}</h4>
            </Link>
            <p className="opacity-50">
              {relativeTime} • {post.privacy}
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <button
            className={`flex clickableImage items-center gap-1 ${
              isLiked ? "text-red-500" : ""
            }`}
            onClick={handleLike}
          >
            <AiOutlineHeart size={20} />
            <span>{likes.length}</span>
          </button>

          <button
            onClick={showLikesPopup}
            className=" clickableImage flex items-center gap-1"
          >
            Show Likes
          </button>

          <button
            className="flex clickableImage items-center gap-1"
            onClick={handleShare}
          >
            <RiShareForwardFill className="cursor-pointer" /> <p>Share</p>
          </button>

          <button className="clickableImage relative">
            <BsThreeDots
              onClick={toggleOptions}
              className="text-gray-500 cursor-pointer"
            />
            {showOptions && (
              <PostOptions
                post={post}
                postId={post._id}
                editPost={user && user._id === post.user._id ? editPost : null}
                deletePost={
                  user && user._id === post.user._id ? deletePost : null
                }
                reportPost={
                  user && user._id !== post.user._id ? reportPost : null
                }
              />
            )}
          </button>
        </div>
      </div>

      <div className="m-auto w-full">
        {post.media?.photo ? (
          <img
            src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
            className="clickableImage w-full max-h-96 rounded-2xl"
            alt="post-img"
            onClick={popUpImage}
          />
        ) : post.media?.video ? (
          <video
            controls
            className="clickableImage w-full max-h-96 rounded-2xl"
            alt="post-video"
          >
            <source
              src={`${summaryApi.domain.url}/uploads/${post.media.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      <div className="p-10 w-full h-40 ">
        <p className="text-xl lg:w-full md:w-full overflow-auto  mb-6">
          {post.content}
        </p>
      </div>
    </div>
  );
}

import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState } from "react";

export default function Post() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  var post = {
    user: {
      username: "Omar Ehab",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    time: "5min ago",
    img: "https://picsum.photos/650/350",
    title:
      "The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More",
    content:
      "If you are looking for a break from the cold, take a cue from Lizzo: This week, the singer headed to Disneyland in warm and sunny California. She dressed up for the occasion in pure Minnie Mouse style perfection, including a cartoon merch sweatshirt from the artist Shelby Swain, cycling shorts, and adorable pulled-up polka dot socks...",
    likes: 326,
    comments: 148,
  };

  return (
    <div className="flex text-secondary flex-col justify-start items-start">
      <div className=" opacity-65 bg-gray-200 w-24 h-14 rounded-xl flex justify-center items-center gap-3 mb-6 mt-6">
        <button className="text-xl flex gap-3 ">
          <p>&lt;</p> Back
        </button>
      </div>

      <div className="flex justify-between items-center w-full mb-10">
        <div className="flex items-center gap-3">
          <img src={post.user.img} className="w-16 h-16 rounded-xl"></img>
          <div>
            <p>{post.user.username}</p>
            <p className="opacity-50">{post.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1">
            <AiOutlineHeart />
            <p>{post.likes}</p>
          </button>
          <button className="flex items-center gap-1">
            <BiComment />
            <p>{post.comments}</p>
          </button>
          <button className="flex items-center gap-1">
            <RiShareForwardFill className="cursor-pointer" /> <p>share</p>
          </button>

          <button className="relative">
            <BiDotsVerticalRounded
              onClick={toggleOptions}
              className="text-3xl cursor-pointer"
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                    Edit Post
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="m-auto">
        <img src={post.img} className="w-full rounded-2xl"></img>
      </div>

      <div className="p-10">
        <p className="text-4xl font-bold mb-6">{post.title}</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

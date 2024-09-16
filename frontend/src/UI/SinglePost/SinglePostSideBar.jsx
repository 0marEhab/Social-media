import { AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import React from "react";

export default function FriendsSideBar() {
  const comments = [
    {
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "Billy Green",
      comment:
        "Awesome Edward, remember that five tips for low-cost holidays I sent you?",
      id: "1",
    },
    {
      img: "https://randomuser.me/api/portraits/men/2.jpg",
      username: "Billy Green",
      comment:
        "Awesome Edward, remember that five tips for low-cost holidays I sent you?",
      id: "2",
    },
    {
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "Billy Green",
      comment:
        "Awesome Edward, remember that five tips for low-cost holidays I sent you?",
      id: "3",
    },
    {
      img: "https://randomuser.me/api/portraits/men/4.jpg",
      username: "Billy Green",
      comment:
        "Awesome Edward, remember that five tips for low-cost holidays I sent you?",
      id: "4",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "Billy Green",
      comment:
        "Awesome Edward, remember that five tips for low-cost holidays I sent you?",
      id: "5",
    },
  ];

  return (
    <div className="bg-secondary rounded-l-3xl px-10 py-16">
      <div className="w-full flex justify-end">
        <img
          src="https://randomuser.me/api/portraits/men/5.jpg"
          alt="user-img"
          className="w-14 h-14 rounded-lg mt-4"
        />
      </div>
      <h2 className="text-xl font-bold text-white">Comments (148)</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 mt-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={comment.img}
                alt="user-img"
                className="w-10 h-10 rounded-full mb-8"
              />
              <div>
                <div className="flex items-center justify-between ">
                  <p className="text-white font-semibold">{comment.username}</p>
                  <p className="text-gray-400   ">20min ago</p>
                </div>
                <p className="text-white">{comment.comment}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 ml-12">
            <button>
              <FcLike />
            </button>
            <button>
              {" "}
              <BiComment className="text-gray-400" />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-start w-[100%] gap-4 mt-8 relative">
        <input
          type="text"
          placeholder="Write a comment..."
          className=" outline-none bg-white w-full h-10 rounded-md text-black p-2"
        />
        <button>
          {" "}
          <AiOutlineSend className="absolute right-8 top-[30%] text-primary" />
        </button>
      </div>
    </div>
  );
}

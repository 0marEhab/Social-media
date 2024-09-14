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
          className="w-14 h-14 rounded-lg "
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
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-semibold">{comment.username}</p>
                <p className="text-white">{comment.comment}</p>
              </div>
              <p className="text-gray-400">20 min</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <FcLike className="cursor-pointer" />
            <BiComment className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      ))}
      <div className="flex justify-start w-[100%] gap-4 mt-8 relative">
        <input
          type="text"
          placeholder="Write a comment..."
          className=" outline-none bg-white w-full h-10 rounded-md text-black p-2"
        />
        <AiOutlineSend className="absolute right-4 top-[30%] text-primary cursor-pointer" />
      </div>
    </div>
  );
}

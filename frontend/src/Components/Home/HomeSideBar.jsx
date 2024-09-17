import { AiOutlineRight, AiOutlineCheck } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { useState } from "react";

export default function HomeSideBar() {
  const [stories, setStories] = useState([
    { img: "https://randomuser.me/api/portraits/men/5.jpg" },
    { img: "https://randomuser.me/api/portraits/men/5.jpg" },
    { img: "https://randomuser.me/api/portraits/men/5.jpg" },
    { img: "https://randomuser.me/api/portraits/men/5.jpg" },
  ]);

  const [recommended, setRecommended] = useState([
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "Cammy Hedling",
      county: "Los Angeles, CA",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "Cammy Hedling",
      county: "Los Angeles, CA",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "Cammy Hedling",
      county: "Los Angeles, CA",
    },
  ]);

  const [trend, setTrend] = useState([
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "MadeInAmerica",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "MadeInAmerica",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "MadeInAmerica",
    },
  ]);

  return (
    <div className="bg-secondary rounded-l-3xl px-10 py-16 mt-4">
      <div className="w-full flex justify-end">
        <img
          src="https://randomuser.me/api/portraits/men/5.jpg"
          alt="user-img"
          className="w-14 h-14 rounded-lg mt-4"
        />
      </div>
      <h2 className="text-xl font-bold text-white">Featured Stories</h2>
      <div className="flex gap-4 mt-4">
        {stories.map((story, index) => (
          <img
            key={index}
            src={story.img}
            alt="user-img"
            className="w-10 h-10 rounded-lg border border-black outline outline-cyan-800"
          />
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mt-4">Who To Follow</h2>
      <div className="flex flex-col gap-4 mt-4">
        {recommended.map((rec, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={rec.img}
              alt="user-img"
              className="w-10 h-10 rounded-lg border border-black outline outline-cyan-800"
            />
            <div className="flex items-center justify-between w-full text-white ">
              <div className="flex flex-col items-center">
                <p>{rec.username}</p>
                <p className="opacity-50">{rec.county}</p>
              </div>
              <button className="bg-primary p-2 rounded-lg">
                <HiUserAdd />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="font-bold flex items-center gap-1 text-gray-400 mt-8">
        SEE MORE <AiOutlineRight />
      </button>

      <h2 className="text-xl font-bold text-white mt-4">Trending Topics</h2>
      <div className="flex flex-col gap-4 mt-4">
        {trend.map((rec, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white font-bold bg-green-500 cursor-pointer">
              #1
            </div>
            <div className="flex items-center justify-between w-full text-white ">
              <div className="flex flex-col items-center">
                <p>{rec.username}</p>
              </div>
              <button className="bg-[#4B4C4D] p-2 rounded-lg">
                <AiOutlineCheck />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

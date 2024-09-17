import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FriendsSideBar() {
  const friends = [
    {
      img: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Sarah Smith",
      username: "@sarah_smith",
      id: "1",
    },
    {
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Emily Johnson",
      username: "@emily_johnson",
      id: "2",
    },
    {
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Brown",
      username: "@michael_brown",
      id: "3",
    },
    {
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Olivia Davis",
      username: "@olivia_davis",
      id: "4",
    },
    {
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "James Miller",
      username: "@james_miller",
      id: "5",
    },
    {
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Sophia Wilson",
      username: "@sophia_wilson",
      id: "6",
    },
    {
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Benjamin Moore",
      username: "@benjamin_moore",
      id: "7",
    },
    {
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Isabella Taylor",
      username: "@isabella_taylor",
      id: "8",
    },
    {
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Daniel Anderson",
      username: "@daniel_anderson",
      id: "9",
    },
    {
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Mia Thomas",
      username: "@mia_thomas",
      id: "10",
    },
    {
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "William Jackson",
      username: "@william_jackson",
      id: "11",
    },
  ];
  return (
    <div className=" bg-secondary col-span-3 rounded-l-3xl px-10 py-16">
      <h2 className=" text-xl font-bold text-white">Who to Follow</h2>
      {friends.map((friend) => (
        <div className="flex items-center justify-between gap-3 my-10">
          <div className="flex space-x-2">
            <img
              src={friend.img}
              className="rounded-xl w-10 object-cover"
              alt={friend.name}
            />
            <div className="flex flex-col items-start justify-center gap-0.5">
              <p className=" text-[14px] font-bold text-white">{friend.name}</p>
              <p className=" text-[12px] font-normal text-white">
                {friend.username}
              </p>
            </div>
          </div>
          <button className="rounded-lg p-3 flex items-center justify-center text-xs bg-primary text-white">
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
      ))}
    </div>
  );
}

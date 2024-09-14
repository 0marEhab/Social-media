import React from "react";
import FriendCard from "../../Components/MyFriends/FriendCard";
import SearchBar from "../../Components/Layout/SearchBar";
import FriendsSideBar from "../../Components/MyFriends/FriendsSideBar";

export default function MyFriends() {
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
    <div className="grid grid-cols-10 gap-10">
      <div className=" col-span-10 lg:col-span-6 xl:col-span-7 p-5 md:p-10">
        <SearchBar />
        <h1 className="text-4xl font-semibold text-center my-5">My Friends</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {friends.map((friend) => (
            <FriendCard friend={friend} key={friend.id} />
          ))}
        </div>
      </div>
            
        <FriendsSideBar />
    </div>
  );
}
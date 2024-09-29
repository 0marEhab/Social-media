import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Components/Layout/Loading";
import axios from "axios";
import summaryApi from "../../../common";
import SideBar from "../../Components/DashBoard/SideBar";
import UserCard from "../../Components/DashBoard/UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(summaryApi.users.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);

  const content = users.map((user) => <UserCard user={user} key={user.id} />);
  if (loading) {
    return <Loading color={"#666AEC"} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <SideBar />
      <h1 className="text-xl font-semibold mb-2">DashBoard</h1>
      <p className="text-l mb-6">
        <FontAwesomeIcon icon={faUser} /> / users
      </p>
      <div className="grid grid-cols-3 gap-6 ">{content}</div>
    </div>
  );
}

export default Users;

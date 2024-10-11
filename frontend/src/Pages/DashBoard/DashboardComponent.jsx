import React, { useEffect, useState } from "react";
import DashBoardCard from "../../Components/DashBoard/DashBoardCard";
import RecentUsers from "../../Components/DashBoard/RecentUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTicket,
  faComment,
  faPager,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "../../Components/Layout/Loading";
<<<<<<< HEAD
import SideBar from "../../Components/DashBoard/SideBar";
=======
import SideBar from "../../Components/DashBoard/NavBarDashboard";
>>>>>>> feature/admin
import summaryApi from "../../../common";

function DashboardComponent() {
  const [posts, setPosts] = useState(0);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState();
  const [trend, setTrend] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(summaryApi.stats.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(response.data.posts);
        setLikes(response.data.likes);
        setComments(response.data.comments);
      } catch (error) {
        setError("Failed to fetch UsersNo");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(summaryApi.tickets.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        setError("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

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

  if (loading) {
    return <Loading color={"#666AEC"} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <SideBar />
      <h1 className="text-xl font-semibold mb-2">Dashboard</h1>
      <p className="text-l mb-6">
        <FontAwesomeIcon icon={faHome} /> / Dashboard
      </p>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          <DashBoardCard title="Users" number={users.length} icon={faUser} />
          <DashBoardCard
            title="Tickets"
            number={tickets.length}
            icon={faTicket}
          />
          <DashBoardCard title="Posts" number={posts} icon={faPager} />
        </div>
        <div className="flex flex-col gap-80 mt-10 md:flex-row ">
          <div className="w-1/2 ">
            <RecentUsers users={users} />
          </div>
          <div className="flex flex-col gap-10 w-1/3 ">
            <DashBoardCard title="Likes" number={likes} icon={faHeart} />
            <DashBoardCard
              title="Comments"
              number={comments}
              icon={faComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;

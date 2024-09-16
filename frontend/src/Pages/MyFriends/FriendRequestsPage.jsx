import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faCheck, faTimes, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FriendRequestsPage() {
  const [activeTab, setActiveTab] = useState("sent");
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: sentData } = await axios.get(`${import.meta.env.VITE_API_URL}/friends/myrequests`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      });
      const { data: receivedData } = await axios.get(`${import.meta.env.VITE_API_URL}/friends/requests`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      });
      setSentRequests(sentData);
      setReceivedRequests(receivedData);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
      toast.error("Failed to fetch friend requests.");
    }
  };

  const handleUnsendRequest = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/friends/request`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        data: { recipientId: userId },
      });
      setSentRequests((prevRequests) => prevRequests.filter((req) => req._id !== userId));
      toast.success("Friend request unsent!");
    } catch (error) {
      toast.error("Failed to unsend friend request.");
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/friends/accept`, { requesterId: userId }, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      });
      setReceivedRequests((prevRequests) => prevRequests.filter((req) => req._id !== userId));
      toast.success("Friend request accepted!");
    } catch (error) {
      toast.error("Failed to accept friend request.");
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/friends/reject`, { requesterId: userId }, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      });
      setReceivedRequests((prevRequests) => prevRequests.filter((req) => req._id !== userId));
      toast.success("Friend request rejected!");
    } catch (error) {
      toast.error("Failed to reject friend request.");
    }
  };

  return (
    <div className="p-16">
      <div className="flex mb-4 w-full">
        <button
          className={`p-2 w-1/2 rounded-l-xl ${activeTab === "received" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("received")}
        >
          Received Requests
        </button>
        <button
          className={`p-2 w-1/2 rounded-r-xl ${activeTab === "sent" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("sent")}
        >
          Sent Requests
        </button>
      </div>

      {activeTab === "sent" ? (
        <div>
          {sentRequests.length === 0 ? (
            <p>No sent requests</p>
          ) : (
            sentRequests.map((request) => (
              <div key={request._id} className="flex items-center justify-between p-3 border mb-2 rounded-3xl">
                <div className="flex items-center">
                  <img src={request.profilePic} alt={request.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <span className="font-semibold">{request.name}</span>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white p-2 rounded-full"
                  onClick={() => handleUnsendRequest(request._id)}
                >
                  <FontAwesomeIcon icon={faUndoAlt} />
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {receivedRequests.length === 0 ? (
            <p>No received requests</p>
          ) : (
            receivedRequests.map((request) => (
              <div key={request._id} className="flex items-center justify-between p-3 border rounded-3xl">
                <div className="flex items-center">
                  <img src={request.profilePic} alt={request.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <span className="font-semibold">{request.name}</span>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white p-2 rounded-full mr-2"
                    onClick={() => handleAcceptRequest(request._id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full"
                    onClick={() => handleRejectRequest(request._id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

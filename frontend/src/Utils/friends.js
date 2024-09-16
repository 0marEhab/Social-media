import axios from "axios";
import {toast} from "react-hot-toast"

export const sendFriendRequest = async (userId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/friends/request`,
      { recipientId: userId },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const fetchRequests = async (setSentRequests, setReceivedRequests, toast, setLoading) => {
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
  } finally {
    setLoading(false);
  }
};

export const handleUnsendRequest = async (userId, setSentRequests) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/friends/request`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      data: { recipientId: userId },
    });
    setSentRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== userId)
    );
    toast.success("Friend request unsent!");
  } catch (error) {
    toast.error("Failed to unsend friend request.");
  }
};

export const handleAcceptRequest = async (userId, setReceivedRequests) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/friends/accept`,
      { requesterId: userId },
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      }
    );
    setReceivedRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== userId)
    );
    toast.success("Friend request accepted!");
  } catch (error) {
    toast.error("Failed to accept friend request.");
  }
};

export const handleRejectRequest = async (userId, setReceivedRequests) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/friends/reject`,
      { requesterId: userId },
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
      }
    );
    setReceivedRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== userId)
    );
    toast.success("Friend request rejected!");
  } catch (error) {
    toast.error("Failed to reject friend request.");
  }
};
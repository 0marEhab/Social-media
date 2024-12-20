import axios from "axios";
import { toast } from "react-hot-toast";
import summaryApi from "../../common";

export const sendFriendRequest = async (userId) => {
  try {
    const response = await axios.post(
      summaryApi.sendReq.url,
      { recipientId: userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

export const fetchRequests = async (
  setSentRequests,
  setReceivedRequests,
  toast,
  setLoading
) => {
  try {
    const { data: sentData } = await axios.get(summaryApi.fetchRequests.url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const { data: receivedData } = await axios.get(
      summaryApi.getFriendRequest.url,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
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
    await axios.delete(summaryApi.sendReq.url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      summaryApi.acceptFriendRequest.url,
      { requesterId: userId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      summaryApi.rejectFriendRequest.url,
      { requesterId: userId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
export const handleDeleteFriend = async (friendId) => {
  try {
    await axios.delete(`${summaryApi.deleteFriend.url}/${friendId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    toast.success("Friend Deleted Successfully!");
  } catch (error) {
    toast.error("Failed to Delete friend.");
  }
};

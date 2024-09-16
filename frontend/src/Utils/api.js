import axios from "axios";

export const sendFriendRequest = async (userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/friends/request`,
        {"recipientId": userId }, 
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );      
      return response.data;
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUser(null);
        });
    } else {
      console.log("no logged in user");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export default UserContext;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import summaryApi from "../../common";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("user", user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(summaryApi.user.url, {
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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

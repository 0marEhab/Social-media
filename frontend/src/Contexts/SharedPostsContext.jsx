import React, { createContext, useState } from "react";

const SharedPostsContext = createContext();

export const SharedPostsProvider = ({ children }) => {
  const [sharedPosts, setSharedPosts] = useState([]);

  const addSharedPost = (post) => {
    setSharedPosts((prev) => [...prev, post]);
  };

  return (
    <SharedPostsContext.Provider value={{ sharedPosts, addSharedPost }}>
      {children}
    </SharedPostsContext.Provider>
  );
};

export default SharedPostsContext;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFriendsPage from "./Pages/MyFriends/MyFriendsPage";
import Settings from "./Pages/Settings/Settings";
import SinglePost from "./Pages/Posts/SinglePost";
import Layout from "./Components/Layout/Layout";
import Signing from "./Pages/Signing/Signing";
import { Toaster } from 'react-hot-toast';
import FriendRequestsPage from "./Pages/MyFriends/FriendRequestsPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/friends",
          element: <MyFriendsPage />,
        },
        {
          path: "/posts/:id",
          element: <SinglePost />,
        },

        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/friend-requests",
          element: <FriendRequestsPage />,
        },
      ],
    },
    {
      path: "/Signing",
      element: <Signing />,
    },
  ]);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "white",
            },
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "white",
            },
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

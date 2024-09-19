import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFriendsPage from "./Pages/MyFriends/MyFriendsPage";
import Settings from "./Pages/Settings/Settings";
import SinglePost from "./Pages/Posts/SinglePost";
import Layout from "./Components/Layout/Layout";
import Signing from "./Pages/Signing/Signing";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import FriendRequestsPage from "./Pages/MyFriends/FriendRequestsPage";
import Ticket from "./Pages/Ticket/Ticket";
import { UserProvider } from "./Contexts/UserContext";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";
import Profile from "./Pages/Profile/Profile";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
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
            {
              path: "/Profile",
              element: <Profile />,
            },
           
          ],
        },
      ],
    },
    {
      path: "/Signing",
      element: <Signing />,
    },
    {
      path: "/ticket",
      element: <Ticket />,
    },
  
  ]);

  return (
    <UserProvider>
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
    </UserProvider>
  );
}

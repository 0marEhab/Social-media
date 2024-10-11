import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFriendsPage from "./Pages/MyFriends/MyFriendsPage";
import Settings from "./Pages/Settings/Settings";
import SinglePost from "./Pages/Posts/SinglePost";
import Layout from "./Components/Layout/Layout";
import Signing from "./Pages/Signing/Signing";
import Home from "./Pages/Home/Home";
import EditPost from "./Pages/Home/EditPost";
import Posts from "./Pages/DashBoard/Posts";
import Tickets from "./Pages/DashBoard/Tickets";
import Users from "./Pages/DashBoard/Users";
import { Toaster } from "react-hot-toast";
import FriendRequestsPage from "./Pages/MyFriends/FriendRequestsPage";
import Ticket from "./Pages/Ticket/Ticket";
import { UserProvider } from "./Contexts/UserContext";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";
import Chat from "./Components/Chat/Chat";
import SearchResults from "./Pages/SearchResult/SearchResults";
import { SharedPostsProvider } from "./Contexts/SharedPostsContext";
import Profile from "./Pages/Profile/Profile";
import DashBoard from "./Pages/DashBoard/DashBoard.jsx";
import NotFoundPage from "./Components/Layout/NotFoundPage.jsx";
import Calendar from "./Components/Home/Calendar.jsx";
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
              path: "/posts/edit/:id",
              element: <EditPost />,
            },
            {
              path: "/chat",
              element: <Chat />,
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
              path: "/search-results",
              element: <SearchResults />,
            },
            {
              path: "/Profile",
              element: <Profile />,
            },
            {
              path: "/Profile/:id",
              element: <Profile />,
            },
            
            {
              path: "calendar",
              element: <Calendar />,
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
      path: "/DashBoard",
      element: <DashBoard />,
    },
    {
      path: "/Posts",
      element: <Posts />,
    },
    {
      path: "/Tickets",
      element: <Tickets />,
    },
    {
      path: "/Users",
      element: <Users />,
    },
    {
      path: "/ticket",
      element: <Ticket />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <SharedPostsProvider>
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
    </SharedPostsProvider>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFriends from "./Pages/MyFriends/MyFriends";
import Settings from "./Pages/Settings/Settings";
import SinglePost from "./Pages/Posts/SinglePost";
import Layout from "./Components/Layout/Layout";
import Signing from "./Pages/Signing/Signing";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/friends",
          element: <MyFriends />,
        },
        {
          path: "/posts/:id",
          element: <SinglePost />,
        },
       
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    }, {
      path:"/Signing",
      element:<Signing />,
    },
  ]);

  return <RouterProvider router={router} />;
}

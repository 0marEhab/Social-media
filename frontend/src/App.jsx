import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFriends from "./Pages/MyFriends/MyFriends";
import Layout from "./Components/Layout/Layout";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

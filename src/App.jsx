import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Notfound from "./page/error/notFound";
import Home from "./page/home/home";
import Users from "./page/maintenances/users";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

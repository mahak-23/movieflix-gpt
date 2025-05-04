import React from "react";

// child components
import Login from "./Login";
import Browse from "./Browse";
import MoviePlayer from "./MoviePlayer";
import NotFoundPage from "./NotFoundPage";
import Layout from "./Layout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "watch/:contentId",
        element: <MoviePlayer />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;

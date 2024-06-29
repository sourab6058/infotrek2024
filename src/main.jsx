import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Events from "./pages/Events.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import { v4 as uuid } from "uuid";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/admin/*",
    element: <AdminPage />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

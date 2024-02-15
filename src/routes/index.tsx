import { lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

// project import
import Loadable from "components/Loadable";
import MainRoutes from "./MainRoutes";

// render - landing page
const LoginPage = Loadable(lazy(() => import("pages/auth/login")));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to="/login" />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
    MainRoutes,
  ]);
}

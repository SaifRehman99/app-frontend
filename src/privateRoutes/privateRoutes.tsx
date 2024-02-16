import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout/layout";
import DashboardPage from "@/components/Dashboard";
import ErrorPage from "@/components/ErrorPage";

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  };
}

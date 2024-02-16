import { Navigate } from "react-router-dom";
import AuthenticationPage from "@/components/Auth/Auth";
import ErrorPage from "@/components/ErrorPage";

export default function publicRoutes() {
  return {
    children: [
      {
        path: "/signup",
        element: <AuthenticationPage isSignUp={true} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <AuthenticationPage isSignUp={false} />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  };
}

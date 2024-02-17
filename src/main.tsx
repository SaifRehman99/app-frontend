import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@components/ui/toaster";
import privateRoutes from "./privateRoutes/privateRoutes.tsx";
import publicRoutes from "./publicRoutes/publicRoutes.tsx";
import "./index.css";

const checkAuth = JSON.parse(localStorage.getItem("token") as any);

// Combine and conditionally include routes based on authentication status
const router = createBrowserRouter([checkAuth ? privateRoutes() : publicRoutes()]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);

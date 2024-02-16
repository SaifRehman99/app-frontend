import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderPage from "@components/Header";

export default function Layout() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        {/* Header for all pages */}
        <HeaderPage />
        <Outlet />
      </Suspense>
    </>
  );
}

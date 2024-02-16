import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        to="/dashboard"
        onClick={() => window.location.replace("/dashboard")}
        className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === "/dashboard" ? "text-white" : "text-gray-400"}`}
      >
        Dashboard
      </Link>

      <Link
        to="/profile"
        onClick={() => window.location.replace("/profile")}
        className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === "/profile" ? "text-white" : "text-gray-400"}`}
      >
        Profile
      </Link>
    </nav>
  );
}

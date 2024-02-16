import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import makeApiRequest from "@utils/axios.interceptors";
import useApiRequest from "@/hooks/useApiRequest";
import { getInitials } from "@/utils/lib";

export function UserNav() {
  const user = JSON.parse(localStorage.getItem("user") as any);

  const { data, error } = useApiRequest<any>(user?._id ? ` users/${user?._id}` : "");

  useEffect(() => {
    if (error) {
      // showNotification("destructive", "Player Videos", error);
    }
    if (data) {
      // showNotification("default", "Player Videos", "Player Videos Loaded Success!");
    }
  }, [error, data]);

  const logOut = async () => {
    try {
      await makeApiRequest("logout", "POST");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="mr-2 py-1 px-2 text-black cursor-pointer rounded-full bg-white">{getInitials(user?.firstName, user?.lastName)}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <Link to={"/profile"}>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user ? `${user?.firstName} ${user?.lastName}` : "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user ? user?.email : "Email"}</p>
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()}>
          <Link to="/login">Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

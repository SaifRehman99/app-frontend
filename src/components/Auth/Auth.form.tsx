import React, { useState } from "react";
import { inputFields, isValidEmail, isValidPassword } from "@/utils/lib";
import { Icons } from "@components/common/index";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { AxiosResponse } from "axios";
import useNotification from "@/hooks/useNotification";
import makeApiRequest from "@utils/axios.interceptors";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp: boolean;
}

export function UserAuthForm({ className, isSignUp, ...props }: UserAuthFormProps) {
  const { showNotification } = useNotification();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<any>({});
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  const redirectPage = (userSignUp: boolean) => {
    setTimeout(() => {
      window.location.href = userSignUp ? "/login" : "/dashboard";
      setIsLoading(false);
      setForm({});
    }, 3000);
  };

  const authHandler = async (isAuth: boolean) => {
    // isAuth will true if user register

    // ============================ Reusing for registering here ===================================== //
    const { password, confirmPassword, email, firstName, lastName } = form;

    if (isAuth && (!firstName || firstName?.length < 3) && (!lastName || lastName?.length < 3)) {
      showNotification("destructive", "User Authentication", "First and Last name can't be Empty and should be greater then 3 words");
      setIsLoading(false);
      return;
    }

    if (isAuth && !isValidEmail(email)) {
      showNotification("destructive", "User Authentication", "Not a Valid Email");
      setIsLoading(false);
      return;
    }

    if (isAuth && password !== confirmPassword) {
      showNotification("destructive", "User Authentication", "Password does't match");
      setIsLoading(false);
      return;
    }

    if (isAuth && (!isValidPassword(password) || !isValidPassword(confirmPassword))) {
      showNotification(
        "destructive",
        "User Authentication",
        "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      setIsLoading(false);
      return;
    }

    // ================================================================================================== //

    try {
      if (!email || !password) {
        showNotification("destructive", "User Authentication", "Enter a valid email and password");
        setIsLoading(false);
        return;
      }
      const data: {
        data?: any;
        response?: AxiosResponse<any, any> | undefined | any;
        error?: any;
        message?: any;
      } = await makeApiRequest(`${isAuth ? "signup" : "login"}`, "POST", isAuth ? { email, password, firstName, lastName } : { email, password });

      if (data?.error?.data?.message || (data?.message && data?.response?.status !== 200)) {
        showNotification(
          "destructive",
          "User Authentication",
          data?.error?.data?.message || data?.message || "Seems like, something went wrong! Try again later"
        );
        setIsLoading(false);
        return;
      }

      if (data?.data?.message === "stripe creation") {
        setIsLoading(false);
        window.location.href = data?.data?.data.url;
        return;
      }

      if (!isAuth) {
        // Access the headers from the response
        const responseHeaders = data?.response.headers;

        // Access the cookie header
        const cookieHeader = responseHeaders["cookie"];

        localStorage.setItem("token", JSON.stringify(cookieHeader.split("=")[1]));
        localStorage.setItem("user", JSON.stringify(data?.data?.data));
      }

      setIsLoading(false);
      showNotification("default", "User Authentication", `User ${isAuth ? "Register" : "Login"} Success!`);
      redirectPage(isAuth ? true : false);
    } catch (error: any) {
      setIsLoading(false);
      showNotification("destructive", "User Authentication", error?.message || "Seems like, something went wrong! Try again later");
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    authHandler(isSignUp);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 mb-4">
            {inputFields?.map(
              (field, index) =>
                (isSignUp || !field.isSignUp) && (
                  <div key={index}>
                    {" "}
                    <Label htmlFor="email">{field?.label}</Label>
                    <div className={cn(["password", "confirmPassword"].includes(field.name) && "relative")}>
                      <Input
                        id={field?.id}
                        placeholder={field?.placeholder}
                        type={
                          ["password", "confirmPassword"].includes(field.name) ? (passwordVisibility[field.name] ? "text" : "password") : field?.type
                        }
                        name={field?.name}
                        disabled={isLoading}
                        className="mb-4"
                        autoComplete="false"
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                      />
                      {["password", "confirmPassword"].includes(field.name) && (
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                          onClick={() => {
                            setPasswordVisibility((prevVisibility) => ({ ...prevVisibility, [field.name]: !prevVisibility[field.name] }));
                          }}
                        >
                          {passwordVisibility[field.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Create account with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
    </div>
  );
}

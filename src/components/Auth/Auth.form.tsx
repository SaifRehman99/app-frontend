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
import { AuthForm } from "@/types";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignUp: boolean;
}

export function UserAuthForm({ className, isSignUp, ...props }: UserAuthFormProps) {
  const { showNotification } = useNotification();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<AuthForm | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  const redirectPage = () => {
    setTimeout(() => {
      window.location.href = "/dashboard";
      setIsLoading(false);
      setForm(null);
    }, 3000);
  };

  const authHandler = async (isAuth: boolean) => {
    // isAuth will true if user register

    // ============================ Reusing for registering here ===================================== //
    const { name, password, confirmPassword, email } = form as AuthForm;

    if (isAuth && (!name || name?.length < 3)) {
      showNotification("destructive", "User Authentication", "Name can't be Empty and should be greater then 3 words");
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

    if (isAuth && (!isValidPassword(password as string) || !isValidPassword(confirmPassword as string))) {
      showNotification(
        "destructive",
        "User Authentication",
        "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      setIsLoading(false);
      return;
    }

    // ============================ API Handing Below ========================================================== //

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
      } = await makeApiRequest(`${isAuth ? "auth/signup" : "auth/login"}`, "POST", isAuth ? { name, email, password } : { email, password });

      if (data?.error?.data?.message || (data?.message && data?.response?.status !== 200)) {
        showNotification(
          "destructive",
          "User Authentication",
          Array.isArray(data?.error?.data?.message)
            ? data?.error?.data?.message.join(" ")
            : data?.error?.data?.message || data?.message || "Seems like, something went wrong! Try again later"
        );
        setIsLoading(false);
        return;
      }

      if (data.data.token) {
        localStorage.setItem("token", JSON.stringify(data?.data?.token));
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        redirectPage();
      }

      setIsLoading(false);
      showNotification("default", "User Authentication", data?.data?.message);
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
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value } as AuthForm)}
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

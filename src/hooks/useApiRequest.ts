import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import makeApiRequest from "@/utils/axios.interceptors";

interface ApiRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Custom hook for handling API requests
const useApiRequest = <T>(apiEndpoint: string, method: string = "GET", formData: any = null): ApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      try {
        const response: {
          data?: any;
          response?: AxiosResponse<any, any> | undefined | any;
          error?: any;
          message?: any;
        } = await makeApiRequest(apiEndpoint, method, formData);

        if (response?.error?.data?.message || response?.message) {
          setError(response?.error?.data?.message || response?.message || "Seems like, something went wrong! Try again later");
          setIsLoading(false);
          return;
        }

        setData(response?.data?.data || null);
        setError(null);
      } catch (error: any) {
        console.log(error);
        if (error.name === "AbortError") {
          console.log("Request was aborted");
        }
        setError(error?.message || "Seems like, something went wrong! Try again later");
      } finally {
        setIsLoading(false);
      }
    };

    // If API endpoint then call, else don't
    apiEndpoint ? fetchData() : setIsLoading(false);
  }, [apiEndpoint, method]);

  return { data, isLoading, error };
};

export default useApiRequest;

import axios, { AxiosResponse } from "axios";

/**
 * Makes a generic API request using Axios.
 * @param path - An array representing the path segments of the API endpoint.
 * @param method - HTTP method for the request (GET, POST, PUT, PATCH, DELETE, etc.).
 * @param data - Data to be sent with the request (optional).
 * @param header - Request headers (optional).
 * @returns {Promise<{ data: any, response?: AxiosResponse, error?: any }>} - Resolves with response data or an error object.
 */
export default async function makeApiRequest(
  path: string,
  method = "GET",
  data?: any | null
): Promise<{ data?: any; response?: AxiosResponse; error?: any; message?: any }> {
  const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/`;

  const apiUrl = `${baseURL}${path}`;

  const options: any = {
    method,
    url: apiUrl,
    headers: {
      ...(JSON.parse(localStorage.getItem("token") as any)
        ? {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as any)}`,
          }
        : {}),
    },
  };

  if (data) {
    // Create a FormData object
    const formData = new FormData();

    // Append data properties to the FormData object
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Use the FormData object as the request data
    options.data = formData;
  }

  try {
    const response = await axios(options);
    return { data: response.data, response };
  } catch (error: any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.clear();
      window.location.href = "/login";
      window.location.reload();
    }
    return { error: error.response, message: error?.message };
  }
}

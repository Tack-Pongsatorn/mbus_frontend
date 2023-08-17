import axios from "axios";

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "API-KEY": import.meta.env.VITE_API_KEY
  }
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) ||
        "Wrong Services"
    )
);

export default axiosServices;

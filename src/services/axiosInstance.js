import axios from "axios";
import { apiEndpoints } from "../utils/Constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== apiEndpoints.auth.login.url) {
        window.location.href = apiEndpoints.auth.login.url;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

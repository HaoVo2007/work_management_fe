import axios from "axios";
import { toast } from "../plugins/toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => {
    const { status, data } = res;
    const msg = data.message || "Success";

    if (status === 201) {
      toast.success(msg);
    } else if (status === 200) {
      toast.success(msg);
    }

    return data;
  },
  (err) => {
    if (err.response) {
      const { status, data } = err.response;
      const errorMsg = data.error || data.message || "Something went wrong";
      if (status === 401) {
        toast.error("Unauthorized! Please log in again.");
        localStorage.removeItem("access_token");
      } else if (status === 201) {
        toast.success(errorMsg);
      } else {
        toast.error(errorMsg);
      }
    } else {
      toast.error("Network error");
    }
    return Promise.reject(err);
  }
);

export default api;

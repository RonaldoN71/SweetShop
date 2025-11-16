import axios from "axios";

const API = "https://sweetshop-ebbi.onrender.com"

// Axios instance for all backend requests
const axiosClient = axios.create({
  baseURL: `${API}/api`,
});

// Attach token to every request if available
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;

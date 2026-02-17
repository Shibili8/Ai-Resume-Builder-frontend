import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-builder-backend-u4v2.onrender.com",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) { // ✅ FIXED
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;

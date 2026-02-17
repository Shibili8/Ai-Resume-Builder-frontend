import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-builder-backend-u4v2.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); 
  console.log("token: ", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

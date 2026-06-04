import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-project-production-1a9f.up.railway.app",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default instance;

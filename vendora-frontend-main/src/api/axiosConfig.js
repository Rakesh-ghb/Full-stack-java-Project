import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8082",
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

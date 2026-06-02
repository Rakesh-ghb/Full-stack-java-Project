import axios from "axios";

// const API = "http://localhost:8082/api/user";
const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = () => {
  return axios.get(API + "/projects");
};

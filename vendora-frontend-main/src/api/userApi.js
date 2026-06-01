import axios from "axios";

const API = "http://localhost:8082/api/user";

export const getProjects = () => {
  return axios.get(API + "/projects");
};

import axios from "./axiosConfig";

export const getAllProjects = async () => {
  const res = await axios.get("/api/projects/public");
  return res.data;
};

export const getProjectById = async (projectId) => {
  const res = await axios.get(`/api/projects/${projectId}`);
  return res.data;
};

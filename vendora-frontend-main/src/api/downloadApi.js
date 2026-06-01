import axios from "./axiosConfig";

export const downloadProject = async (projectId) => {
  return axios.get(`/api/projects/download/${projectId}`, {
    responseType: "blob",
  });
};

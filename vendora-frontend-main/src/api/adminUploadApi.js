import axios from "./axiosConfig";

export const uploadProjectApi = async (formData) => {
  return axios.post("/api/admin/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

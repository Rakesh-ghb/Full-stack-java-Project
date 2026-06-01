import axios from "./axiosConfig";

export const loginApi = (data) =>
  axios.post("/api/auth/login", data);

export const registerApi = (data) =>
  axios.post("/api/auth/register", data);

// FORGOT PASSWORD
export const forgotPasswordApi = (email) =>
  axios.post("/api/auth/forgot-password", { email });

// RESET PASSWORD
export const resetPasswordApi = (token, newPassword) =>
  axios.post("/api/auth/reset-password", { token, newPassword });

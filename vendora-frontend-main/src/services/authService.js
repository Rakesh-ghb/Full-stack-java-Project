import { loginApi, registerApi } from "../api/authApi";

export const loginUser = async (data) => {
  const res = await loginApi(data);
  return res.data; // { token }
};

export const registerUser = async (data) => {
  const res = await registerApi(data);
  return res.data;
};

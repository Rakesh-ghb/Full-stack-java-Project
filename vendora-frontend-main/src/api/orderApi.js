import axios from "./axiosConfig";

export const createOrder = async (projectId) => {
  const res = await axios.post(`/api/orders/buy/${projectId}`);
  return res.data;
};

// 🔥 FIXED LOGIC – ONLY PAID ORDERS WILL RETURN
export const getPurchasedProjects = async () => {
  const res = await axios.get("/api/orders/my");

  return res.data
    .filter(o => o.orderStatus === "PAID")   // ← IMPORTANT FIX
    .map(o => o.projectId);
};

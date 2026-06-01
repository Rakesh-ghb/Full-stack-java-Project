import axios from "./axiosConfig";

export const createPayment = async (orderId, amount) => {
  const res = await axios.post(
    `/api/payments/create?orderId=${orderId}&amount=${amount}`
  );
  return res.data;
};

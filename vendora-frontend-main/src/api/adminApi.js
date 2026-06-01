import axios from "./axiosConfig";

// ===== DASHBOARD =====
export const getDashboard = () =>
  axios.get("/api/admin/dashboard");

// ===== USERS =====
export const getUsers = () =>
  axios.get("/api/admin/users");

// ===== PROJECTS =====
export const getProjects = () =>
  axios.get("/api/admin/projects");

export const updateProjectStatus = (id, isActive) =>
  axios.put(`/api/admin/projects/${id}/status?isActive=${isActive}`);

// ===== ORDERS =====
export const getOrders = () =>
  axios.get("/api/admin/orders");

// ===== PAYMENTS =====
export const getPayments = () =>
  axios.get("/api/admin/payments");

export const deleteProjectApi = (id) =>
  axios.delete(`/api/admin/projects/${id}`);

export const updateProjectApi = (id, data) =>
  axios.put(`/api/admin/projects/${id}`, data);

import axiosClient from "./axiosClient";

// Get full list of sweets
export const fetchSweets = () => axiosClient.get("/sweets");

// Search sweets with query params
export const searchSweets = (params) =>
  axiosClient.get("/sweets/search", { params });

// Create new sweet (admin only)
export const createSweet = (sweet) => axiosClient.post("/sweets", sweet);

// Update an existing sweet
export const updateSweet = (id, data) =>
  axiosClient.put(`/sweets/${id}`, data);

// Delete a sweet by ID
export const deleteSweet = (id) => axiosClient.delete(`/sweets/${id}`);

// Purchase sweet (reduce stock)
export const purchaseSweet = (id, data) =>
  axiosClient.post(`/sweets/${id}/purchase`, data);

// Restock sweet (increase stock)
export const restockSweet = (id, data) =>
  axiosClient.post(`/sweets/${id}/restock`, data);

// Get a single sweet
export const getSweet = (id) => axiosClient.get(`/sweets/${id}`);

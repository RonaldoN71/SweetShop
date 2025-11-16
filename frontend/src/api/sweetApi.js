import axiosClient from "./axiosClient";

export const fetchSweets = () => axiosClient.get("/sweets");
export const searchSweets = (params) =>
  axiosClient.get("/sweets/search", { params });

export const createSweet = (sweet) => axiosClient.post("/sweets", sweet);
export const updateSweet = (id, data) =>
  axiosClient.put(`/sweets/${id}`, data);

export const deleteSweet = (id) => axiosClient.delete(`/sweets/${id}`);

export const purchaseSweet = (id, data) =>
  axiosClient.post(`/sweets/${id}/purchase`, data);

export const restockSweet = (id, data) =>
  axiosClient.post(`/sweets/${id}/restock`, data);

export const getSweet = (id) => axiosClient.get(`/sweets/${id}`);

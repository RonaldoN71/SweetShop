import axiosClient from "./axiosClient";

// Register a new user
export const register = (data) => axiosClient.post("/auth/register", data);

// Login user
export const login = (data) => axiosClient.post("/auth/login", data);

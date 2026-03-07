import apiClient from "../lib/api-client";

export const loginUser = async(data: any) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}

export const logoutUser = async() => {
const response = await apiClient.post("/auth/logout");
return response.data;
}

export const getAuthStatus = async() => {
  const response = await apiClient.get("/auth/status");
  return response.data;
}
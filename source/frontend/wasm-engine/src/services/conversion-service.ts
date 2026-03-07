import apiClient from "../lib/api-client";


export const createConversionRecord = async(data: {fileName: string; operation: string}) => {
  const response = await apiClient.post("/conversions/create-file", data);
  return response.data;
}

export const getConversionHistory = async() => {
  const response = await apiClient.get("/conversions/read-all-files");
  return response.data;
}
import API from "../lib/api-client";


export const createConversionRecord = async(data: {fileName: string; operation: string}) => {
  const response = await API.post("/conversions/create-file", data);
  return response.data;
}

export const getConversionHistory = async() => {
  const response = await API.get("/conversions/read-all-files");
  return response.data;
}


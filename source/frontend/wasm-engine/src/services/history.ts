import API from "../lib/api-client"



export const saveToDatabase = async (data: { fileName: string, originalSize: number, operation: string, status: string }): Promise<any> => {
  try {
    const response = await API.post("/history", data);
    return response.data;
  } catch (e: any) {
    throw e;
  }
}
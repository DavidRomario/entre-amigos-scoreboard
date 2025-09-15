import axios from "axios";
import { API_URL } from "../config/api";

export const loginAdmin = async (user, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { user, password });
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
};

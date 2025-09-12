// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const loginAdmin = async (user, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { user, password });
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
};

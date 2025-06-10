
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const register = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/`, formData);
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    throw err;
  }
};

export const login = async (formData) => {
  try {
const response = await axios.post(`${BASE_URL}/users/login/`, formData)
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    throw err;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err);
    throw err;
  }
};

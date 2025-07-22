import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

const BASE_URL = "http://localhost:5000"; // Your backend URL

export const fetchSomething = async () => {
  const response = await fetch(`${BASE_URL}/api/something`);
  const data = await response.json();
  return data;
};

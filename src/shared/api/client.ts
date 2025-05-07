import axios from "axios";

export const client = axios.create({
    baseURL: `https://${import.meta.env.VITE_API_BASE_URL}.mokky.dev`,
    headers: {
      'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})
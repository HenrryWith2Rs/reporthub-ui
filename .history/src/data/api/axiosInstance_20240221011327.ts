import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  // withCredentials: true, // Ensure cookies are sent with requests
});

export default axiosInstance;

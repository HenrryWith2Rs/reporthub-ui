// data/api/axiosInstance.ts
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path accordingly
import { useContext } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from the AuthContext
    const { token } = useContext(AuthContext);

    // If a token is available, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token in Axios Request:', token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

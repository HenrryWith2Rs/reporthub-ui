import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add an interceptor for requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from wherever it is stored in your application
    const { token } = useContext(AuthContext); // You'll need to replace this with the actual token

    // If the token exists, add it to the Authorization header as a Bearer token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;

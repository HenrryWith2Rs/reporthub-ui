import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Update the path to your AuthContext file
import { useContext } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Retrieve token from context
    const authContext = useContext(AuthContext);
    const { token } = authContext;
    const localToken = localStorage.getItem('token');
    console.log('localToken', localToken);

    // Add Bearer token to headers if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Bearer Token:', token); // Log the token for debugging
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

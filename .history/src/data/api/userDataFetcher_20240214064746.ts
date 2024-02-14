import axios, { AxiosError } from 'axios';

// const baseURL = import.meta.env.BASE_URL;
const baseURL = 'http://localhost:3000/api';

export const fetchLogin = async (email: string, password: string) => {
  console.log('baseURL', baseURL);
  console.log('username', email);
  console.log('password', password);
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Handle Axios errors and other types of errors
    if (axios.isAxiosError(error)) {
      // If the error is an AxiosError, narrow down its type to AxiosError
      const axiosError = error as AxiosError;
      throw new Error(`Axios error during login: ${axiosError.message}`);
    } else {
      // If the error is not an AxiosError, treat it as a generic error
      throw new Error(`Error during login: ${error}`);
    }
  }
};

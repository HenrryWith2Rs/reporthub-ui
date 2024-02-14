import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.BASE_URL;

export const fetchLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      username,
      password,
    });
    // Ensure response status is 2xx before returning data
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      // If response status is not in the 2xx range, throw an error
      throw new Error(`Request failed with status code ${response.status}`);
    }
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

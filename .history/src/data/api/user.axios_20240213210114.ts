// data /user.axios.ts
import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.BASE_URL;

export const fetchLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error during login: ${error}`);
  }
};

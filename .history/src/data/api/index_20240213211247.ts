// api/userDataFetcher.ts
import axios from 'axios';

const baseURL = import.meta.env.BASE_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
});

export default axiosClient;

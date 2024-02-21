import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path accordingly

export const fetchAppointmentData = async (params: RequestParameters) => {
  try {
    const { token } = useContext(AuthContext); // Access the token from the AuthContext

    const response = await axiosInstance.get('/report/appt/request', {
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment data -> ${error}`);
  }
};

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const fetchBillingData = async (params: RequestParameters) => {
  try {
    const response = await axios.post(`${baseURL}/kore/bill`, params);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

import axios from 'axios';
import { RequestParameters } from '../../types/koreTypes';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppointmentData = async (params: RequestParameters) => {
  try {
    const response = await axios.get(`${baseURL}/kore/appt`, { params });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment data -> ${error}`);
  }
};

export const fetchBillingData = async (params: RequestParameters) => {
  try {
    const response = await axios.post(`${baseURL}/kore/bill`, params);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

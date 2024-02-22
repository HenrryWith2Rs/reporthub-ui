import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';

export const fetchAppointmentData = async (
  params: RequestParameters,
  token: string
) => {
  try {
    const response = await axiosInstance.get('/report/appt/request', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment data -> ${error}`);
  }
};

export const fetchBillingData = async (
  params: RequestParameters,
  token: string
) => {
  try {
    const response = await axiosInstance.get('/report/bill/request', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

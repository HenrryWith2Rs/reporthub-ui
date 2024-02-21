import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';

export const fetchAppointmentData = async (params: RequestParameters) => {
  try {
    const response = await axiosInstance.get('/report/appt/request', {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment data -> ${error}`);
  }
};

export const fetchBillingData = async (params: RequestParameters) => {
  try {
    const response = await axiosInstance.post('/kore/bill', params);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path accordingly

export const fetchAppointmentData = async (params: RequestParameters) => {
  try {
    const { token } = useContext(AuthContext); // Access the token from the AuthContext
    console.log('fetchAppointmentData -> token ->', token);
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

export const fetchBillingData = async (params: RequestParameters) => {
  try {
    const response = await axiosInstance.post(`/report/bill/request`, params);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

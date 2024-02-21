import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const fetchAppointmentData = async (params: RequestParameters) => {
  try {
    const { token } = useContext(AuthContext); // Access the token from the context
    if (!token) {
      throw new Error('Token not found');
    }
    console.log('token', token);
    const response = await axiosInstance.get('/report/appt/request', {
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
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

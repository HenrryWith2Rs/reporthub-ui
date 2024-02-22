import { useContext } from 'react';
import axiosInstance from './axiosInstance';
import { RequestParameters } from '../../types/koreTypes';
import { AuthContext } from '../../context/AuthContext';

const getToken = () => {
  const { token } = useContext(AuthContext);
  if (!token) throw new Error('Token not found');

  return token;
};

export const fetchAppointmentData = async (params: RequestParameters) => {
  const token = getToken();
  try {
    const token = getToken();
    const response = await axiosInstance.get('/report/appt/request', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment data -> ${error}`);
  }
};

export const fetchBillingData = async (params: RequestParameters) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get('/report/bill/request', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch billing data -> ${error}`);
  }
};

// data/hooks/useKoreBotData.ts
import { useQuery } from '@tanstack/react-query';
import {
  RequestParameters,
  BotType,
  ReportType,
  FormatType,
} from '../../types/koreTypes';
import {
  fetchAppointmentData,
  fetchBillingData,
} from '../api/koreBotDataFetcher';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const useAppointmentData = (
  botType: string,
  dateStart: string,
  dateEnd: string,
  reportType: string,
  format: string,
  isFetchEnabled: boolean,
  identifier: string,
  "appointment"
) => {
  const params: RequestParameters = {
    bot: botType as BotType,
    reportType: reportType as ReportType,
    format: format as FormatType,
    dateStart,
    dateEnd,
  };

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [`${botType}${reportType}Data`, dateStart, dateEnd],
    queryFn: () => fetchAppointmentData(params),
    enabled: isFetchEnabled,
  });

  console.log(`queryKey: ${botType}${reportType}${identifier}Data`);

  return {
    data,
    isFetching,
    error,
    refetch,
  };
};

export const useBillingData = (
  botType: string,
  dateStart: string,
  dateEnd: string,
  reportType: string,
  format: string,
  isFetchEnabled: boolean,
  identifier: string
) => {
  const params: RequestParameters = {
    bot: botType as BotType,
    reportType: reportType as ReportType,
    format: format as FormatType,
    dateStart,
    dateEnd,
  };

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [`${botType}Data`, dateStart, dateEnd],
    queryFn: () => fetchBillingData(params),
    enabled: isFetchEnabled,
  });

  return {
    data,
    isFetching,
    error,
    refetch,
  };
};

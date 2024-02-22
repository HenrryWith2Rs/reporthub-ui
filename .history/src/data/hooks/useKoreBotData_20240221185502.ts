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

export const useAppointmentData = (
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
    queryKey: [`${botType}${reportType}${identifier}Data`, dateStart, dateEnd],
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
    queryKey: [`${botType}${reportType}${identifier}Data`, dateStart, dateEnd],
    queryFn: () => fetchBillingData(params),
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

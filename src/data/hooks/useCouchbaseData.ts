import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getCouchbaseDataByID,
  fetchAllCouchbaseData,
  deleteCouchbaseDataByID,
} from "../api/couchbaseDataFetcher"
import {
  RequestParameters,
  BotType,
  ReportType,
  FormatType,
} from "../../types/koreTypes"
export const useAllCouchbaseData = (
  botType: string,
  dateStart: string,
  dateEnd: string,
  reportType: string,
  format: string,
  isFetchEnabled: boolean
) => {
  const params: RequestParameters = {
    bot: botType as BotType,
    reportType: reportType as ReportType,
    format: format as FormatType,
    dateStart,
    dateEnd,
  }
  return useQuery({
    queryKey: [`${botType}${reportType}CBData`, dateStart, dateEnd],
    queryFn: () => fetchAllCouchbaseData(params),
    enabled: isFetchEnabled,
    staleTime: Infinity,
  })
}

export const useGetCouchbaseDataByID = (id: string) => {
  return useQuery({
    queryKey: ["couchbaseDataByID", id],
    queryFn: () => getCouchbaseDataByID(id),
  })
}

export const useDeleteCouchbaseDataByID = (id: string) => {
  return useMutation({
    mutationFn: () => deleteCouchbaseDataByID(id),
  })
}

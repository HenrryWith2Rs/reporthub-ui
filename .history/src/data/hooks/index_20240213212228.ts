import axiosClient from '../api';
import { useQuery, useMutation } from '@tanstack/react-query';

export function useRequestProcessor() {
  function query<TData>(
    key: string,
    queryFunction: () => Promise<TData>,
    options = {}
  ) {
    return useQuery<TData>({
      queryKey: [`${key}Data`],
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate(key, mutationFunction, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { query, mutate };
}

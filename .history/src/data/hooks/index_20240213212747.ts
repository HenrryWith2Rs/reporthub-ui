import axiosClient from '../api';
import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query';

export function useRequestProcessor() {
  const queryClient = useQueryClient();
  function query<TData>(
    key: string,
    queryFunction: () => Promise<TData>,
    options = {}
  ) {
    return useQuery<TData>({
      queryKey: [`${key}Query`],
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate<TData, TVariables>(
    key: string,
    mutationFunction: MutationFunction,
    options = {}
  ) {
    return useMutation({
      mutationKey: [`${key}Mutation`],
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { query, mutate };
}

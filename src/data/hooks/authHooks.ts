import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchLogin } from '../api/userDataFetcher';

export const useLogin = (email: string, password: string) => {
  return useMutation({ mutationFn: () => fetchLogin(email, password) });
};

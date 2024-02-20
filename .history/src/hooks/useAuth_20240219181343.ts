import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types/types';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const logUserin = (user: User) => {
    addUser(user);
  };

  const logUserout = () => {
    removeUser();
  };

  return { user, logUserin, logUserout };
};

import { useState } from 'react';
import { User } from '../types/types';
export const useUserStorage = () => {
  const [user, setUser] = useState(null);

  const storeUser = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const retrieveUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, storeUser, retrieveUser, clearUser };
};

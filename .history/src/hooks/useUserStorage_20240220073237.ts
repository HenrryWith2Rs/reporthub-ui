// hooks/useUserStorage.ts
import { useState } from 'react';
import { User } from '../types/types';

export const useUserStorage = () => {
  const [user, setUser] = useState<User | null>(null);

  const storeUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const retrieveUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, storeUser, retrieveUser, clearUser };
};

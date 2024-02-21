// hooks/useUserStorage.ts
import { useState } from 'react';
import { User } from '../types/authTypes';

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
    console.log('useUserStorage -> retrieveUser -> ', storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
      return JSON.parse(storedUser) as User;
    }
    return null;
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, storeUser, retrieveUser, clearUser };
};

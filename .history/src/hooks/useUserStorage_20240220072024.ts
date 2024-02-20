import { useState } from 'react';
import { User } from '../types/types';

export const useUserStorage = () => {
  const [user, setUser] = useState<User | null>(null); // Make User type optional

  const storeUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const retrieveUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User); // Assert storedUser as User
    }
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, storeUser, retrieveUser, clearUser };
};

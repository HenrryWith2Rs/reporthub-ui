// hooks/useTokenStorage.ts
import { useState } from 'react';

export const useTokenStorage = () => {
  const [token, setToken] = useState<string | null>(null);

  const storeToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const retrieveToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      return storedToken;
    }
    return null;
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, storeToken, retrieveToken, clearToken };
};

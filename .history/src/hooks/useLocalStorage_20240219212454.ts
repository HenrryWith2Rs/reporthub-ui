import { useState } from 'react';

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    // console.log('useLocalStorage -> setItem -> ', value);
    localStorage.setItem(key, value);
    setValue(value);
  };

  const getItem = (key: string) => {
    console.log('useLocalStorage -> getItem -> ', key);
    const value = localStorage.getItem(key);
    // console.log('useLocalStorage -> getItem -> ', value);
    setValue(value);
    return value;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};

// context/AuthContext.tsx
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Props, AuthContextType, User } from '../types/types';
import { useAuth } from '../hooks/useAuth';

const initialValue = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user, setUser, logUserIn, logUserOut } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

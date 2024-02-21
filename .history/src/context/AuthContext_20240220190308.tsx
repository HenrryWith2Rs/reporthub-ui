// context/AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { Props, AuthContextType, User } from '../types/authTypes';
import { useUserStorage } from '../hooks/useUserStorage';

const initialValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user: storedUser, storeUser } = useUserStorage();
  const [user, setUser] = useState<User | null>(storedUser);

  // Ensure the user is set in the context before rendering children
  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  return (
    <AuthContext.Provider value={{ user, setUser: storeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

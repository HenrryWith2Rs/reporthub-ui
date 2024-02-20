// context/AuthContext.tsx
import React, { createContext } from 'react';
import { Props, AuthContextType, User } from '../types/types';
import { useUserStorage } from '../hooks/useUserStorage';

const initialValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user, retrieveUser, storeUser } = useUserStorage(); // Destructure storeUser from useUserStorage

  // Retrieve user from local storage during initialization
  React.useEffect(() => {
    const user = retrieveUser();
    console.log('useLocaAuthProviderlStorage -> useEffect -> ', user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: storeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

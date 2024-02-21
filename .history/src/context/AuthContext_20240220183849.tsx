// context/AuthContext.tsx
import React, { createContext } from 'react';
import { Props, AuthContextType, User } from '../types/authTypes';
import { useUserStorage } from '../hooks/useUserStorage';

const initialValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user, retrieveUser, storeUser } = useUserStorage();

  // Retrieve user from local storage during initialization
  React.useEffect(() => {
    const retrievedUser = retrieveUser();
    console.log('AuthProvider -> useEffect -> ', retrievedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: storeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// context/AuthContext.tsx
import React, { createContext } from 'react';
import { Props, AuthContextType } from '../types/authTypes';
import { useTokenStorage } from '../hooks/useTokenStorage';

const initialValue: AuthContextType = {
  token: null,
  setToken: () => {},
  clearToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { token, retrieveToken, storeToken, clearToken } = useTokenStorage();

  // Retrieve Token from local storage during initialization
  React.useEffect(() => {
    const retrievedToken = retrieveToken();
    console.log('AuthProvider -> useEffect -> ', retrievedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: storeToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

/*
import React, { createContext } from 'react';
import { Props, AuthContextType, User } from '../types/authTypes';
import { useUserStorage } from '../hooks/useUserStorage';

const initialValue: AuthContextType = {
  user: null,
  setUser: () => {},
  clearUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user, retrieveUser, storeUser, clearUser } = useUserStorage();

  // Retrieve user from local storage during initialization
  React.useEffect(() => {
    const retrievedUser = retrieveUser();
    console.log('AuthProvider -> useEffect -> ', retrievedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: storeUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

*/

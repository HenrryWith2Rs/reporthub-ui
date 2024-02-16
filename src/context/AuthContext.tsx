// context/AuthContext.tsx
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Props, AuthContextType, User } from '../types/types';

const initialValue = {
  token: '',
  setToken: () => {},
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [token, setToken] = useState<string>(initialValue.token);
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const navigate = useNavigate();

  return (
    <AuthContext.Provider
      value={{ token, setToken, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

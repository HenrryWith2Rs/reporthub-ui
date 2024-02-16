// context/AuthContext.tsx
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Props, AuthContextType, User } from '../types/types';
import { CookiesProvider, useCookies } from 'react-cookie';

const initialValue = {
  // user: {
  //   sub: '',
  //   name: '',
  //   role: '',
  //   iat: 0,
  //   exp: 0,
  // },
  // setUser: () => {},
  cookies: ['access_token'],
  setCookies: () => {},
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [cookies, setCookies] = useCookies();
  // const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const navigate = useNavigate();

  return (
    <AuthContext.Provider
      value={{ cookies, setCookies, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

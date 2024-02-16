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
  cookies: '',
  setCookies: () => {},
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [cookies, setCookie] = useCookies(['user']);
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const navigate = useNavigate();

  return (
    <AuthContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
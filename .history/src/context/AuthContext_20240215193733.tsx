// context/AuthContext.tsx
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Props, IAuthContext, User } from '../types/types';

const initialValue = {
  user: {
    sub: '',
    name: '',
    role: '',
    iat: 0,
    exp: 0,
  },
  authenticated: false,
  setAuthenticated: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [user, setUser] = useState<User>(initialValue.user);

  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const navigate = useNavigate();

  return (
    <AuthContext.Provider value={{ user, authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

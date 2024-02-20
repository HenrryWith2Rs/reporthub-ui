// context/AuthContext.tsx
import { createContext } from 'react';
import { Props, AuthContextType } from '../types/types';
// import { useAuth } from '../hooks/useAuth';

const initialValue = {
  user: null,
  setUser: () => {},
  logUserIn: () => {},
  logUserOut: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { user, setUser, logUserIn, logUserOut } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

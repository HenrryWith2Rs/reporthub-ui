// context/AuthContext.tsx
import { createContext, useState } from 'react';
import { Props, AuthContextType, User } from '../types/types';

// import { useAuth } from '../hooks/useAuth';

const initialValue = {
  user: null,
  setUser: () => {},
  // logUserIn: () => {},
  // logUserOut: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  // const { user, setUser, logUserIn, logUserOut } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

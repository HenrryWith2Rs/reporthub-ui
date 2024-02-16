import { ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};

export type User = {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export type AuthContextType = {
  user: User | null;
  setUser: (newState: User) => void;
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

// export type AuthContextType = {
//   user: User;
//   login: (username: string, password: string) => Promise<string>;
//   logout: () => void;
// };

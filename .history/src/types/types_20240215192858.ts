import { ReactNode } from 'react';

export type User = {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

export type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
};

export type Props = {
  children?: ReactNode;
};

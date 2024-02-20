import { ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};

export type User = {
  sub: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
};

export type AuthContextType = {
  token: string;
  setToken: (newState: string) => void;
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

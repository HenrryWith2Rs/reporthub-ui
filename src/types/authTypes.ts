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
  // user: User | null;
  // setUser: (newState: User | null) => void;
  // clearUser: () => void;
  token: string | null;
  setToken: (newState: string | null) => void;
  clearToken: () => void;
};

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
  user: User | null;
  setUser: (newState: User | null) => void;
  clearUser: (newState: null) => void;
  // logUserIn: (newState: User) => void;
  // logUserOut: () => void;
};

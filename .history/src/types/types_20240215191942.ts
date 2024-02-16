export type User = {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
};

export type UserType = {
  name: string
  isAuthenticated: boolean
}

export type AuthContextType = {
  user: UserType
  login: (username: string, password: string) => Promise<string>
  logout: () => void
}

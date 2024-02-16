// import { createContext, useContext, useState } from "react"
// import RenderHeader from "../components/structure/Header"
// import {
//   RenderMenu,
//   RenderRoutes,
// } from "../components/structure/RenderNavigation"
// import { AuthContextType, UserType } from "../types/types"

// const AuthContext = createContext<AuthContextType | undefined>(undefined)
// export const AuthData = () => useContext(AuthContext)

// export const AuthWrapper = () => {
//   const [user, setUser] = useState<UserType>({
//     name: "",
//     isAuthenticated: false,
//   })

//   const login = (userName: string, password: string) => {
//     // Make a call to the authentication API to check the username

//     return new Promise<string>((resolve, reject) => {
//       if (password === "password") {
//         setUser({ name: userName, isAuthenticated: true })
//         resolve("success")
//       } else {
//         reject("Incorrect password")
//       }
//     })
//   }
//   const logout = () => {
//     setUser({
//       name: "",
//       isAuthenticated: false,
//     })
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       <>
//         <RenderHeader />
//         <RenderMenu />
//         <RenderRoutes />
//       </>
//     </AuthContext.Provider>
//   )
// }

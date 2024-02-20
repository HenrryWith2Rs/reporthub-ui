// import { useEffect } from 'react';
// import { useUser } from './useUser';
// import { useLocalStorage } from './useLocalStorage';
// import { User } from '../types/types';

// export const useAuth = () => {
//   const { user, setUser, addUser, removeUser } = useUser();
//   const { getItem } = useLocalStorage();

//   useEffect(() => {
//     const user = getItem('user');
//     // console.log('useAuth -> useEffect -> ', user);
//     if (user) {
//       addUser(JSON.parse(user));
//     }
//   }, []);

//   const logUserIn = (user: User) => {
//     // console.log('useAuth -> logUserIn -> ', user);
//     addUser(user);
//   };

//   const logUserOut = () => {
//     removeUser();
//   };

//   return { user, setUser, logUserIn, logUserOut };
// };

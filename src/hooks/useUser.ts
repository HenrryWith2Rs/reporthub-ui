// // hooks/useUser.ts
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useLocalStorage } from './useLocalStorage';
// import { User } from '../types/types';

// export const useUser = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { setItem } = useLocalStorage();

//   const addUser = (user: User) => {
//     setUser(user);
//     console.log('useUser -> addUser -> ', user);
//     setItem('user', JSON.stringify(user));
//   };

//   const removeUser = () => {
//     setUser(null);
//     setItem('user', '');
//   };

//   return { user, setUser, addUser, removeUser };
// };

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import UserCard from '../components/UserCard'; // Import the Card component

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log('Home -> user -> ', user);

  // // Decode the token to access its attributes
  // const decodedToken: any = jwtDecode(token);

  // // Access attributes from the decoded token
  // const { sub, name, role, iat, exp } = decodedToken;

  // return <UserCard name={name} sub={sub} role={role} iat={iat} exp={exp} />;
  return (
    <div>
      <p>{user?.name}</p>
    </div>
  );
};

export default Home;

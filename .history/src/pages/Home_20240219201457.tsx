import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import UserCard from '../components/UserCard'; // Import the Card component

const Home = () => {
  // const { token } = useContext(AuthContext);

  // // Decode the token to access its attributes
  // const decodedToken: any = jwtDecode(token);

  // // Access attributes from the decoded token
  // const { sub, name, role, iat, exp } = decodedToken;

  // return <UserCard name={name} sub={sub} role={role} iat={iat} exp={exp} />;
  return (
    <div>
      <p>hi</p>
    </div>
  );
};

export default Home;

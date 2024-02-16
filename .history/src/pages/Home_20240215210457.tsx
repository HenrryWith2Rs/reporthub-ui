import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const { token } = useContext(AuthContext);

  // Decode the token to access its attributes
  const decodedToken: any = jwtDecode(token);

  // Access attributes from the decoded token
  const { sub, name, role, iat, exp } = decodedToken;

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>User ID: {sub}</p>
      <p>Role: {role}</p>
      <p>Issued At: {new Date(iat * 1000).toLocaleString()}</p>
      <p>Expiration Time: {new Date(exp * 1000).toLocaleString()}</p>
    </div>
  );
};

export default Home;

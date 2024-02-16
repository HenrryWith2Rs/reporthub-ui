import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { token } = useContext(AuthContext);
  return <div>Welcome, {token}</div>;
};

export default Home;

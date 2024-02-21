import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserCard from '../components/UserCard';
import jwtDecode from 'jwt-decode';

const Home = () => {
  const { token } = useContext(AuthContext);
  console.log('Token:', token);

  // Ensure user is not null before accessing its properties
  if (!token) {
    return <div>Loading...</div>;
  }
  const decoded = jwtDecode(token);
  // Destructure user object to extract properties
  const { sub, name, role } = decoded;

  return (
    <div>
      {/* Render the UserCard component with user information */}
      <UserCard name={name} sub={sub} role={role} />
    </div>
  );
};

export default Home;

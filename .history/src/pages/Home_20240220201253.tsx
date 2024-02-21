import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserCard from '../components/UserCard';

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log('User:', user);

  // Ensure user is not null before accessing its properties
  if (!user) {
    return <div>Loading...</div>;
  }

  // Destructure user object to extract properties
  const { sub, name, role } = user;

  return (
    <div>
      {/* Render the UserCard component with user information */}
      <UserCard name={name} sub={sub} role={role} />
    </div>
  );
};

export default Home;

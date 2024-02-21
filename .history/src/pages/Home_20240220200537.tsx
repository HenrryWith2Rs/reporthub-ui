import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserCard from '../components/UserCard';

const Home = () => {
  const { user, clearUser } = useContext(AuthContext);
  console.log('User:', user);

  const handleLogout = () => {
    // Call the clearUser function from the AuthContext to log the user out
    clearUser();
  };

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
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

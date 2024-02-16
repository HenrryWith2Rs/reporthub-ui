import { AuthData } from '../../auth/AuthWrapper';
import { AuthContextType, UserType } from '../../types';

const Account = () => {
  // const { user: UserType } = AuthData()

  return (
    <div className="page">
      <h2>Your Account</h2>
      {/* <p>Username: {user.name}</p> */}
    </div>
  );
};

export default Account;

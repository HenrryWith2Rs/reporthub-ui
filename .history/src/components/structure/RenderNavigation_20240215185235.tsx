import { Link, Route, Routes } from 'react-router-dom';
import { AuthData } from '../../auth/AuthWrapper';
import { nav } from './navigation';
import { UserType } from '../../types';

export const RenderRoutes = () => {
  const { user } = AuthData() as { user: UserType };

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData() as { user: UserType; logout: () => void };

  const MenuItem: React.FC<{ route: (typeof nav)[number] }> = ({ route }) => {
    return (
      <div className="menuItem">
        <Link to={route.path}>{route.name}</Link>
      </div>
    );
  };
  return (
    <div className="menu">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} route={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} route={r} />;
        } else return false;
      })}

      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to={'#'} onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to={'login'}>Log in</Link>
        </div>
      )}
    </div>
  );
};

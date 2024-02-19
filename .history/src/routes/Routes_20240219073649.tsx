import React, { useContext } from 'react';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import Home from '../pages/Home';
import Login from '../pages/Login';

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  return (
    <ThemeRegistry>
      <Router>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Router>
    </ThemeRegistry>
  );
};

export default Routes;

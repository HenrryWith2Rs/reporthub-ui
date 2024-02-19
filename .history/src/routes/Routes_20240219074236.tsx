import React, { useContext } from 'react';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Sidebar from '../pages/global/Sidebar';

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
          <div className="app">
            <Sidebar />
            <Route path="/" element={<Home />} />
          </div>
        </Route>
      </Router>
    </ThemeRegistry>
  );
};

export default Routes;

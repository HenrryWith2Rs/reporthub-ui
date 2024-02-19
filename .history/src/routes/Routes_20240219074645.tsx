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

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const Routes = (props: Props) => {
  return (
    <ThemeRegistry>
      <div className="app">
        <Router>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Router>
      </div>
    </ThemeRegistry>
  );
};

export default Routes;

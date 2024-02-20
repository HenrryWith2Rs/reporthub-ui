import React, { useContext, useEffect } from 'react';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Sidebar from '../pages/global/Sidebar';
import Topbar from '../pages/global/Topbar';
import Pie from '../pages/pie';
import Line from '../pages/line';
import Geography from '../pages/geography';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {};

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  // const { getItem } = useLocalStorage();
  // let user = localStorage.getItem('user');
  // const user = { 'sub': '2TK7G9P', 'name': 'Henrry', 'role': 'User' };
  // const { getItem } = useLocalStorage();
  // const user = getItem('user');
  console.log('PrivateRoutes -> user -> ', user);

  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
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
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/geography" element={<Geography />} />
          </Route>
        </Router>
      </div>
    </ThemeRegistry>
  );
};

export default Routes;

import React, { useContext, useEffect, useState } from 'react';
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

type Props = {};

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data is available
    if (user !== null) {
      setLoading(false); // Update loading state once user data is available
    }
  }, [user]);

  // If loading, display a loading indicator or null
  if (loading) {
    return null; // Or display a loading indicator
  }

  // If user is null, navigate to login page
  if (!user) {
    return <Navigate to="/login" replace />; // Ensure Navigate component is rendered
  }
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

import React from 'react';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
import Topbar from '../pages/global/Topbar';
import Sidebar from '../pages/global/Sidebar';
import Dashboard from '../pages/dashboard';
import Appointment from '../pages/appointment';
import Billing from '../pages/billing';
import Bar from '../pages/bar';
import Pie from '../pages/pie';
import Line from '../pages/line';
import Geography from '../pages/geography';
import Team from '../pages/team';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App = () => {
  return (
    <ThemeRegistry>
      <div className="app">
        <Topbar />
        <Router>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoutes />} />
        </Router>
      </div>
    </ThemeRegistry>
  );
};

const ProtectedRoutes = () => {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Router>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kore/appt" element={<Appointment />} />
          <Route path="/kore/bill" element={<Billing />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/team" element={<Team />} />
        </Router>
      </main>
    </>
  );
};

export default App;

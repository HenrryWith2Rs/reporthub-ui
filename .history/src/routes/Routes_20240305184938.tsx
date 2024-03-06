import { useContext, useEffect, useState } from 'react';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeRegistry from '../ThemeRegistry/ThemeRegistry';
// import Home from '../pages/Home';
import Login from '../pages/Login';
import Appointment from '../pages/appointment';
import Sidebar from '../pages/Sidebar';
import Topbar from '../pages/Topbar';
import Pie from '../pages/pie';
import Line from '../pages/line';
import Geography from '../pages/geography';
import Dashboard from '../pages/dashboard';
import Error from '../pages/error';
import Contacts from '../pages/contacts';
import Team from '../pages/team';
import Form from '../pages/form';
import Calendar from '../pages/calendar';
import Dialog from '../pages/dialog';
import FAQ from '../pages/faq';
import Invoices from '../pages/invoices';
import Properties from '../pages/properties';
import Elevate from '../pages/elevate';

type Props = {};

const PrivateRoutes = () => {
  // const user = localStorage.getItem('user');
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) return <Navigate to="/login" replace />;
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/elevate" element={<Elevate />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/dialog" element={<Dialog />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/form" element={<Form />} />
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Router>
      </div>
    </ThemeRegistry>
  );
};

export default Routes;

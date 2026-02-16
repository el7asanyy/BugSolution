import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Register from './pages/Register';
import OTPVerification from './pages/OTPVerification';
import VerifiedSuccess from './pages/VerifiedSuccess';
import LocationSelect from './pages/LocationSelect';
import HomePage from './pages/Home';
import SellOil from './pages/SellOil';
import PointsPage from './pages/Points';
import ProfilePage from './pages/Profile';

import { LanguageProvider } from './context/LanguageContext';

import OrderTracking from './pages/OrderTracking';
import TransactionHistory from './pages/TransactionHistory';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/verified" element={<VerifiedSuccess />} />
          <Route path="/location" element={<LocationSelect />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sell" element={<SellOil />} />
          <Route path="/points" element={<PointsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<TransactionHistory />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/orders" replace />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

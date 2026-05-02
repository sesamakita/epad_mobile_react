import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Static imports for stability
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import LapanganDashboard from './pages/lapangan/LapanganDashboard';
import KasirDashboard from './pages/kasir/KasirDashboard';
import WPDashboard from './pages/wp/WPDashboard';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={
          !isAuthenticated ? <Navigate to="/login" /> : 
          user.role === 'admin' ? <AdminDashboard /> :
          user.role === 'lapangan' ? <LapanganDashboard /> :
          user.role === 'kasir' ? <KasirDashboard /> :
          user.role === 'wp' ? <WPDashboard /> : <Navigate to="/login" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

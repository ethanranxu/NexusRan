import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/SEO';
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import BackupRestore from './pages/Admin/BackupRestore';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminLayout from './pages/Admin/AdminLayout';
import RegionProjects from './pages/RegionProjects';
import { useVisitorLogger } from './hooks/useVisitorLogger';

function AppRoutes() {
  useVisitorLogger();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:region" element={<RegionProjects />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="backup" element={<BackupRestore />} />
          {/* Default to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <SEO />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

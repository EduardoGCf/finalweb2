import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import PublicLayout from './pages/Public/PublicLayout';
import Home from './pages/Public/Home';
import RoadDetail from './pages/Public/RoadDetail';
import MunicipalitySearch from './pages/Public/MunicipalitySearch';
import NotFound from './pages/NotFound';
import Register from './pages/Public/Register';
import Login from './pages/Private/Login';
import AdminDashboard from './pages/Private/AdminDashboard';
import VerifierDashboard from './pages/Private/VerifierDashboard';
import ManageUsers from './pages/Private/ManageUsers';
import ManageRoads from './pages/Private/ManageRoads';
import ManageMunicipalities from './pages/Private/ManageMunicipalities';
import ManageIncidents from './pages/Private/ManageIncidents';
import IncidentRequests from './pages/Private/IncidentRequests';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="road/:id" element={<RoadDetail />} />
            <Route path="municipality-search" element={<MunicipalitySearch />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/login" element={<Login />} />

          {/* Rutas privadas */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'verifier']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/verifier" element={<VerifierDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/verifier/roads" element={<ManageRoads />} />
            <Route path="/verifier/municipalities" element={<ManageMunicipalities />} />
            <Route path="/verifier/incidents" element={<ManageIncidents />} />
            <Route path="/verifier/requests" element={<IncidentRequests />} />
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

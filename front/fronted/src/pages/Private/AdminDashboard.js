import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Panel de Administrador</h2>
      <p>Bienvenido, administrador. Desde aquí puedes acceder a las diferentes opciones:</p>
      <ul>
        <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
        <li><Link to="/verifier/roads">Gestionar Carreteras</Link></li>
        <li><Link to="/verifier/municipalities">Gestionar Municipios</Link></li>
        <li><Link to="/verifier/incidents">Gestionar Incidentes</Link></li>
        <li><Link to="/verifier/requests">Revisar Solicitudes de Incidencia</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;

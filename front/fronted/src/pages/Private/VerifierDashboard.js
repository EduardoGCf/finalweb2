import React from 'react';
import { Link } from 'react-router-dom';

const VerifierDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Panel de Verificador</h2>
      <p>Bienvenido, verificador. Desde aquí puedes acceder a las opciones:</p>
      <ul>
        <li><Link to="/verifier/roads">Gestionar Carreteras</Link></li>
        <li><Link to="/verifier/municipalities">Gestionar Municipios</Link></li>
        <li><Link to="/verifier/incidents">Gestionar Incidentes</Link></li>
        <li><Link to="/verifier/requests">Revisar Solicitudes de Incidencia</Link></li>
      </ul>
    </div>
  );
};

export default VerifierDashboard;

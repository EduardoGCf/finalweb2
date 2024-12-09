import React, { createContext,useEffect, useState } from 'react';
import incidentRequestsAPI from '../../api/incidentRequestsAPI'; 
import useAuth from '../../hooks/useAuth';

const IncidentRequests = () => {
  const { auth } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const data = await incidentRequestsAPI.getAll(auth.token);
      setRequests(data);
    };
    loadRequests();
  }, [auth.token]);

  const handleApprove = async (requestId) => {
    await incidentRequestsAPI.approve(requestId, auth.token);
    alert('Solicitud aprobada y convertida en incidente');
  };

  const handleReject = async (requestId) => {
    // Lógica para rechazar
    await incidentRequestsAPI.reject(requestId, auth.token);
    alert('Solicitud rechazada');
  };

  return (
    <div className="container mt-5">
      <h2>Solicitudes de Incidencia</h2>
      {requests.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Detalle</th>
              <th>Foto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.detail}</td>
                <td>
                  {req.photo && <img src={req.photo} alt="Incidente" style={{ width: '100px' }} />}
                </td>
                <td>
                  <button className="btn btn-success" onClick={() => handleApprove(req.id)}>Aprobar</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleReject(req.id)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidentRequests;

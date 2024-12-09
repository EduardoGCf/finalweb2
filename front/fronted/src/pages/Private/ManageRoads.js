import React, { useEffect, useState } from 'react';
import roadsAPI from '../../api/roadsAPI'; 
import useAuth from '../../hooks/useAuth';

const ManageRoads = () => {
  const { auth } = useAuth();
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    const loadRoads = async () => {
      const data = await roadsAPI.getAll(auth.token);
      setRoads(data);
    };
    loadRoads();
  }, [auth.token]);

  const handleDelete = async (id) => {
    await roadsAPI.delete(id, auth.token);
    setRoads(roads.filter(r => r.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Gestionar Carreteras</h2>
      <button className="btn btn-primary mb-3">Crear Carretera</button>
      {roads.length === 0 ? (
        <p>No hay carreteras registradas.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roads.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.originName}</td>
                <td>{r.destName}</td>
                <td>{r.blocked ? 'Bloqueada' : 'Libre'}</td>
                <td>
                  <button className="btn btn-secondary">Editar</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(r.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageRoads;

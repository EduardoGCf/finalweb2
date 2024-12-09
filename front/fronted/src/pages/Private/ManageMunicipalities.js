import React, { useEffect, useState } from 'react';
import municipalitiesAPI from '../../api/municipalitiesAPI'; 
import useAuth from '../../hooks/useAuth';

const ManageMunicipalities = () => {
  const { auth } = useAuth();
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    const loadMunicipalities = async () => {
      const data = await municipalitiesAPI.getAll(auth.token);
      setMunicipalities(data);
    };
    loadMunicipalities();
  }, [auth.token]);

  const handleDelete = async (id) => {
    await municipalitiesAPI.delete(id, auth.token);
    setMunicipalities(municipalities.filter(m => m.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Gestionar Municipios</h2>
      <button className="btn btn-primary mb-3">Crear Municipio</button>
      {municipalities.length === 0 ? (
        <p>No hay municipios registrados.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Coordenadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {municipalities.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{`${m.coordinates.lat}, ${m.coordinates.lng}`}</td>
                <td>
                  <button className="btn btn-secondary">Editar</button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMunicipalities;

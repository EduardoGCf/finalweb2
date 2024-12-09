// src/pages/Private/ManageIncidents.js
import React, { useEffect, useState } from 'react';
import incidentsAPI from '../../api/incidentsAPI';
import useAuth from '../../hooks/useAuth';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageIncidents = () => {
  const { auth } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newType, setNewType] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');

  useEffect(() => {
    const loadIncidents = async () => {
      const data = await incidentsAPI.getAll(auth.token);
      setIncidents(data);
    };
    loadIncidents();
  }, [auth.token]);

  const handleDelete = async (id) => {
    await incidentsAPI.delete(id, auth.token);
    setIncidents(incidents.filter(i => i.id !== id));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const incidentData = {
      type: newType,
      reason: newReason,
      coordinates: { lat: parseFloat(newLat), lng: parseFloat(newLng) }
    };

    await incidentsAPI.create(incidentData, auth.token);
    const data = await incidentsAPI.getAll(auth.token);
    setIncidents(data);
    setShowCreateModal(false);
    setNewType('');
    setNewReason('');
    setNewLat('');
    setNewLng('');
  };

  return (
    <div className="container mt-5">
      <h2>Gestionar Incidentes</h2>
      <Button className="mb-3" onClick={() => setShowCreateModal(true)}>Crear Incidente</Button>

      {incidents.length === 0 ? (
        <p>No hay incidentes registrados.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Tipo</th>
              <th>Razón</th>
              <th>Coordenadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>
  {i.photo ? (
    <img 
      src={i.photo.startsWith('http') ? i.photo : process.env.REACT_APP_API_URL + i.photo} 
      alt="Incidente" 
      style={{ width: '100px', height: 'auto' }} 
    />
  ) : 'Sin imagen'}
</td>

                <td>{i.type}</td>
                <td>{i.reason}</td>
                <td>{`${i.coordinates.lat}, ${i.coordinates.lng}`}</td>
                <td>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(i.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Incidente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control value={newType} onChange={e => setNewType(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Razón</Form.Label>
              <Form.Control value={newReason} onChange={e => setNewReason(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Latitud</Form.Label>
              <Form.Control value={newLat} onChange={e => setNewLat(e.target.value)} required type="number" step="any" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Longitud</Form.Label>
              <Form.Control value={newLng} onChange={e => setNewLng(e.target.value)} required type="number" step="any" />
            </Form.Group>
            <Button type="submit" variant="primary">Crear</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageIncidents;

import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ReportIncidentForm = ({ show, onHide, onSubmit, selectedCoordinates }) => {
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    if (!selectedCoordinates) {
      alert('Seleccione un punto en el mapa antes de reportar el incidente.');
      return;
    }
    if (!type || !reason) {
      alert('Tipo y Razón son requeridos.');
      return;
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('reason', reason);
    formData.append('coordinates', JSON.stringify(selectedCoordinates));
    if (photo) formData.append('photo', photo);

    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reportar Incidente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control 
            type="text" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            placeholder="Ej: No transitable por conflictos sociales"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Razón</Form.Label>
          <Form.Control 
            type="text" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder="Ej: Bloqueo en la vía"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Foto</Form.Label>
          <Form.Control 
            type="file" 
            onChange={(e) => setPhoto(e.target.files[0])} 
          />
        </Form.Group>
        <p>Coordenadas seleccionadas: 
          {selectedCoordinates ? `Lat: ${selectedCoordinates.lat}, Lng: ${selectedCoordinates.lng}` : 'Ninguna'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary" onClick={handleSubmit}>Enviar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportIncidentForm;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const IncidentModal = ({ show, onHide, incidentReasonPhoto }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Motivo de Bloqueo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {incidentReasonPhoto ? (
          <img src={incidentReasonPhoto} alt="Motivo" style={{ width: '100%' }} />
        ) : (
          <p>No hay foto disponible</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IncidentModal;

import React from 'react';
import { Form } from 'react-bootstrap';

const RoadFilter = ({ incidentTypes, selectedType, onTypeChange }) => {
  return (
    <Form className="mb-3">
      <Form.Label>Filtrar por tipo de incidencia</Form.Label>
      <Form.Select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">Todos</option>
        {incidentTypes.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default RoadFilter;

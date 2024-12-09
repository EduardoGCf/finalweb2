import React from 'react';
import { Button, Table } from 'react-bootstrap';

const RoadList = ({ roads, onViewRoad, onViewReason }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Municipio Origen</th>
          <th>Municipio Destino</th>
          <th>Carretera</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {roads.map(r => (
          <tr key={r.id}>
            <td>{r.originName}</td>
            <td>{r.destName}</td>
            <td>{r.name}</td>
            <td>{r.blocked ? 'Bloqueada' : 'Libre'}</td>
            <td>
              <Button variant="primary" onClick={() => onViewRoad(r)}>Ver Carretera</Button>{' '}
              {r.blocked && (
                <Button variant="info" onClick={() => onViewReason(r)}>Ver Motivo</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RoadList;

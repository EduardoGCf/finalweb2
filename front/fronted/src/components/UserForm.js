import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('verifier');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, role });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rol</Form.Label>
        <Form.Select value={role} onChange={e => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="verifier">Verificador</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit">Crear Usuario</Button>
    </Form>
  );
};

export default UserForm;

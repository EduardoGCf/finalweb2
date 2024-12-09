import React, { useState } from 'react';
import authAPI from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import NavbarPublic from '../../components/NavbarPublic';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authAPI.register(email, password);
      alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
      navigate('/login'); 
    } catch (error) {
      alert('Error al registrar el usuario. Verifica el email y vuelve a intentar.');
      console.error(error);
    }
  };

  return (
    <>
      <NavbarPublic />
      <div className="container mt-4">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
      </div>
    </>
  );
};

export default Register;

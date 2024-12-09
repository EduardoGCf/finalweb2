import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      if (data && data.token) {
        navigate('/');
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error(error);
      alert('Credenciales inválidas');
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
      <div className="container mt-5">
        <h2>¿No tienes cuenta?</h2>
        <Link to="../Register">Registro</Link>
      </div>
    </>
  );
};

export default Login;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const { auth, logout } = useAuth();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Transporte Bolivia</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
        <Nav.Link as={Link} to="/municipality-search">Buscar Municipio</Nav.Link>
      </Nav>
      <Nav>
        {auth.user ? (
          <>
            <Nav.Link as={Link} to={auth.user.role === 'admin' ? '/admin' : '/verifier'}>
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={logout}>Salir</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;

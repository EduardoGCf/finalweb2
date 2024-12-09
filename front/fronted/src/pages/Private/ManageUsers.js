import React, { useState, useEffect } from 'react';
import usersAPI from '../../api/usersAPI';
import useAuth from '../../hooks/useAuth';
import UserForm from '../../components/UserForm';

const ManageUsers = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await usersAPI.getAll(auth.token);
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    await usersAPI.create(userData, auth.token);
    loadUsers();
  };

  return (
    <div>
      <h2>Gestionar Usuarios</h2>
      <UserForm onSubmit={handleCreateUser} />
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;

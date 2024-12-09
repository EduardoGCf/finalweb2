import React, { createContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    if (data.token) {
      setAuth({ user: { email: email, role: data.role }, token: data.token });
    }
    return data;
  };

  const logout = () => {
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

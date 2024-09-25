import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    alert('Por favor, inicia sesión para acceder a esta página.');
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;

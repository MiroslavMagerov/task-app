export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    alert('Por favor, inicia sesión para acceder a esta página.');
    return null;
  }

  return children;
};

export default ProtectedRoute;

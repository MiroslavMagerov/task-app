import { createContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import useAlert from '../hooks/useAlert';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { logoutAlert } = useAlert();

  const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const verifyTokenExistance = () => {
      const token = localStorage.getItem('AuthenticationToken');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    setIsLoading(false);

    verifyTokenExistance();
  }, [BACKEND_API]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem('AuthenticationToken');
    setIsAuthenticated(false);

    logoutAlert();
    redirect('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

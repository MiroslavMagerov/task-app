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
    const verifyTokenExistance = async () => {
      const token = localStorage.getItem('AuthenticationToken');

      if (!token) {
        console.error('No JWT found');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_API}/users/verify`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('User not logged in', response.statusText);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyTokenExistance();
  }, [BACKEND_API]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const token = localStorage.getItem('AuthenticationToken');

    localStorage.removeItem('AuthenticationToken');
    setIsAuthenticated(false);

    try {
      const response = await fetch(`${BACKEND_API}/users/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Logout failed:', response.statusText);
      }

      logoutAlert();
      redirect('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

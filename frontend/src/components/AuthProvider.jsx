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
    const verifyCookieExistance = async () => {
      try {
        const response = await fetch(`${BACKEND_API}/verify`, {
          method: 'GET',
          credentials: 'include',
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

    verifyCookieExistance();
  }, [BACKEND_API]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setIsAuthenticated(false);

    try {
      const response = await fetch(`${BACKEND_API}/logout`, {
        method: 'POST',
        credentials: 'include',
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

import { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export const useAuthForm = () => {
  const MIN_USERNAME_PASSWORD_LENGTH = 5;

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);

  const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (
      username.length < MIN_USERNAME_PASSWORD_LENGTH ||
      password.length < MIN_USERNAME_PASSWORD_LENGTH
    ) {
      setError(
        `Username and password must be at least ${MIN_USERNAME_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    const endpoint = loginOrRegister ? 'login' : 'register';

    console.log(
      `Intentando ${
        loginOrRegister ? 'iniciar sesión' : 'registrar'
      } con el usuario: ${username}`
    );

    try {
      const resp = await fetch(`${BACKEND_API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log(
        `Respuesta del servidor para ${
          loginOrRegister ? 'login' : 'register'
        }:`,
        resp
      );

      const data = await resp.json();

      if (!resp.ok) {
        console.error(data.message || 'Error en el servidor');
        setError(data.message);
        return;
      }

      if (!loginOrRegister) {
        setSuccessMessage('Successfully signed in. Now you can log in!');
        return;
      }

      localStorage.setItem('token', data.token);
      console.log('JWT generado:', data.token);
      setSuccessMessage('Successfully logged in.');
      login();
    } catch (error) {
      setError('Connection error. Try again later.');
      console.error(error);
    }
  };

  const handleBlur = (field) => {
    switch (field) {
      case 'username':
        switch (username.trim()) {
          case '':
            setUsernameError(true);
            return;
          default:
            setUsernameError(false);
            return;
        }

      case 'password':
        switch (password.trim()) {
          case '':
            setPasswordError(true);
            return;
          default:
            setPasswordError(false);
            return;
        }
    }
  };

  const handleFocus = (field) => {
    if (field === 'username' && username.length <= 0) {
      setUsernameError(false);
      return;
    }

    if (field === 'password' && password.length > 0) {
      setUsernameError(false);
      return;
    }
  };

  return {
    username,
    setUsername,
    usernameError,
    password,
    setPassword,
    passwordError,
    showPassword,
    setShowPassword,
    loginOrRegister,
    setLoginOrRegister,
    error,
    successMessage,
    handleSubmitForm,
    handleBlur,
    handleFocus,
  };
};

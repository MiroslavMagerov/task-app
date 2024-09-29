import { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export const useAuthForm = () => {
  const MIN_USERNAME_PASSWORD_LENGTH = 5;

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState('login');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

  const areCredentialsValid = () => {
    if (
      username.length < MIN_USERNAME_PASSWORD_LENGTH ||
      password.length < MIN_USERNAME_PASSWORD_LENGTH
    ) {
      return false;
    }

    return true;
  };

  const successfullLogin = () => {
    console.log('Successfully logged in.');
    setSuccessMessage('Successfully logged in.');
    login();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!areCredentialsValid()) {
      setError(
        `Username and password must be at least ${MIN_USERNAME_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    console.log(
      `Intentando ${
        loginOrRegister === 'login' ? 'iniciar sesión' : 'registrar'
      } con el usuario: ${username}`
    );

    try {
      const resp = await fetch(`${BACKEND_API}/users/${loginOrRegister}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log(resp);

      const data = await resp.json();

      if (!resp.ok) {
        console.error(data.message || 'Server error');
        setError(data.message);
        return;
      }

      if (loginOrRegister === 'register') {
        setSuccessMessage('Successfully signed in. Now you can log in!');
        return;
      }

      successfullLogin();
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
    if (field === 'username' && username.length <= 0) setUsernameError(false);
    else if (field === 'password' && password.length > 0)
      setUsernameError(false);
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

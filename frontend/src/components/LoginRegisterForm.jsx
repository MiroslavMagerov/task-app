import { useState } from 'react';
import '../styles/loginRegisterPage.css';

export const LoginRegisterForm = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loginOrRegister, setLoginOrRegister] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const BACKEND_API = 'https://task-app-3ois.onrender.com/users';

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (username.length < 5 || password.length < 5) {
      setError('Username and password must be at least 5 characters long.');
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
    } catch (error) {
      setError('Connection error. Try again later.');
      console.error(error);
    }
  };

  const handleBlur = (field) => {
    if (field === 'username' && username.trim() === '') {
      setUsernameError(true);
      return;
    }

    if (field === 'password' && password.trim() === '') {
      setPasswordError(true);
      return;
    }

    if (field === 'username') setUsernameError(false);
    if (field === 'password') setPasswordError(false);
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

  return (
    <main>
      <form className='login-form' onSubmit={handleSubmitForm}>
        <h1>{loginOrRegister ? 'Log in' : 'Sign up'}</h1>
        <input
          type='text'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value), handleFocus('username');
          }}
          required
          placeholder='Username'
          onBlur={() => handleBlur('username')}
          className={`${usernameError ? 'error' : ''}`}
        />
        <p className={`error-message ${usernameError ? 'visible' : ''}`}>
          Required
        </p>

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
          className={`${passwordError ? 'error' : ''}`}
        />
        <p className={`error-message ${passwordError ? 'visible' : ''}`}>
          Required
        </p>

        <button type='submit'>{loginOrRegister ? 'LOG IN' : 'SIGN UP'}</button>
        <button
          type='button'
          onClick={() => setLoginOrRegister(!loginOrRegister)}
        >
          {loginOrRegister ? 'SWITCH TO SIGN UP' : 'SWITCH TO LOG IN'}
        </button>
      </form>
      <div className='info-div'>
        {successMessage && <p className='success'>{successMessage}</p>}
        {error && <p className='error'>{error}</p>}
      </div>
    </main>
  );
};

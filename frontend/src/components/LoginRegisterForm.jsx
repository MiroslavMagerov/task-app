import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginRegisterPage.css';

export const LoginRegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginOrRegister, setLoginOrRegister] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const BACKEND_API = 'https://task-app-3ois.onrender.com/users';

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (username.length < 5 || password.length < 5) {
      setError(
        'El nombre de usuario y contraseña deben tener al menos 5 carácteres'
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
        setSuccessMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        return;
      }

      localStorage.setItem('token', data.token);
      console.log('JWT generado:', data.token);
      setSuccessMessage('Login exitoso');
      navigate('/tasks');
    } catch (error) {
      setError('Error de conexión. Inténtalo más tarde.');
      console.error(error);
    }
  };

  return (
    <main>
      <div>
        <form className='login-form' onSubmit={handleSubmitForm}>
          <h1>{loginOrRegister ? 'Login form' : 'Register form'}</h1>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          {successMessage && <p className='success'>{successMessage}</p>}
          {error && <p className='error'>{error}</p>}
          <button type='submit'>
            {loginOrRegister ? 'Login' : 'Register'}
          </button>
          <button
            type='button'
            onClick={() => setLoginOrRegister(!loginOrRegister)}
          >
            {loginOrRegister ? 'Switch to register' : 'Switch to login'}
          </button>
        </form>
      </div>
    </main>
  );
};

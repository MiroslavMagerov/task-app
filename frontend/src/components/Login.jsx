import { useState } from 'react';
import '../styles/login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const BACKEND_API = 'https://task-app-3ois.onrender.com/users';

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const endpoint = isLogged ? 'login' : 'register';

    console.log(
      `Intentando ${
        isLogged ? 'iniciar sesión' : 'registrar'
      } con el usuario: ${username}`
    );

    try {
      const resp = await fetch(`${BACKEND_API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log(
        `Respuesta del servidor para ${isLogged ? 'login' : 'register'}:`,
        resp
      );

      const data = await resp.json();
      if (resp.ok && isLogged) {
        localStorage.setItem('token', data.token);
        console.log('JWT generado:', data.token);
        // Manejar la redirección o el éxito aquí
      } else {
        console.error(data.message || 'Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmitForm}>
        <h2>{isLogged ? 'Login form' : 'Register form'}</h2>
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
        <button type='submit'>{isLogged ? 'Login' : 'Register'}</button>
        <button type='button' onClick={() => setIsLogged(!isLogged)}>
          {isLogged ? 'Switch to register' : 'Switch to login'}
        </button>
      </form>
    </main>
  );
};

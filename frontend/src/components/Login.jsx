import { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const BACKEND_API = 'https://tasks-app-066e11260d66.herokuapp.com/users';

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`${BACKEND_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await resp.json();
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-div'>
      <h3>Register Form</h3>
      <form onSubmit={handleSubmitForm}>
        <fieldset>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          ></input>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          ></input>
          <button type='submit'>Register</button>
        </fieldset>
      </form>
    </div>
  );
};

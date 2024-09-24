import { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch('', {
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
      <form onSubmit={handleSubmitForm}>
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
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

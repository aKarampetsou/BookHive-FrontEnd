import React, { useState } from 'react';
import axios from '../axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Συνάρτηση για την υποβολή των credentials
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/auth/login', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token); // Αποθήκευση του token
        alert('Login successful');
      })
      .catch(() => alert('Invalid credentials'));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';
import { TextField, Button, Snackbar } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/auth/login', { username, password })
      .then((response) => {
        login(response.data.token);
        alert('Login successful');
      })
      .catch(() => setError(true));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        message="Invalid credentials"
      />
    </div>
  );
}

export default LoginPage;

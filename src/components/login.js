import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './header';
import { Container, Box } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (username === 'pakashastra' && password === 'Pakashastra') {
      // Additional login logic if needed
      console.log('Login successful');

      // Call the onLogin function from props
      onLogin();

      // No need to setRedirectToHome; the App component will handle the redirection
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const backgroundStyle = {
    backgroundImage: "url('https://i.ibb.co/0QFRX4j/Pakashastrahome.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const constyle = {
    color: '#4c6f3c',
    padding: '250px',
    paddingLeft: '440px',
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    borderRadius: '8px',
    height: '20vh',
    width: '30vh',
  };

  const inputStyle = {
    marginBottom: '15px',
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  return (
    <div style={backgroundStyle}>
      <Header />
      <Container style={constyle}>
        <Box style={boxStyle}>
          <h1>Login</h1>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </Box>
      </Container>
    </div>
  );
};

export default Login;

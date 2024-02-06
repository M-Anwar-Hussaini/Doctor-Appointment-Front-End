import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../Doctor/Styles/login.css';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

function LoginForm() {
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  // const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuthToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        // firstname,
        // lastname,
        // role,
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., redirect)
      const { token } = response.data;
      setAuthToken(token);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input type="text" placeholder="First Name" value={firstname}
      onChange={(e) => setFirstname(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastname}
       onChange={(e) => setLastname(e.target.value)} />
      <input type="text" placeholder="Role" value={role}
      onChange={(e) => setRole(e.target.value)} /> */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <Link to="/signup">Dont have an account? Sign up here</Link>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;

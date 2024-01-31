import React, { useContext, useEffect, useState } from 'react';
import '../Doctor/Styles/login.css';
import AuthContext from './AuthContext';

const SignupForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordDigest, setPasswordDigest] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { setAuthToken, authToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password !== passwordDigest) {
    //   setError("Passwords don't match");
    //   return;
    // }
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          role,
          email,
          password,
          // password_digest: passwordDigest,
        }),
      });

      if (!response.ok) {
        throw new Error('Error signing up');
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      // setPasswordDigest('');
      setRole('');

      // Sign in the user after successful signup
      const loginResponse = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('Error logging in');
      }

      const userData = await loginResponse.json();
      console.log('Login successful:', userData);
      const { token } = userData;
      console.log('NA THE TOKEN BE THIS :', token);
      // Store user session or token in your frontend application
      // For example, you can use localStorage or sessionStorage
      localStorage.setItem('userToken', token);
      setAuthToken(token);
      console.log('NA THE TOKEN BE THIS after SETTING :', authToken);
      // Handle successful signup (e.g., redirect)
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log('NA THE TOKEN BE THIS after SETTING WITH USE EFFECT :', authToken);
  }, [authToken]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <input type="password" placeholder="Confirm Password"
       value={passwordDigest} onChange={(e) => setPasswordDigest(e.target.value)} /> */}
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="normal">Normal</option>
      </select>
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;

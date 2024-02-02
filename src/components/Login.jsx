/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
const LOGIN_URL = 'http://localhost:3000/login';
function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = {
    //   user: {
    //     email,
    //     password: pwd,
    //   },
    // };
    try {
      // const res = await axios.post(LOGIN_URL, JSON.stringify(formData), {
      //   headers: { 'Content-Type': 'application/json' },
      //   Accept: 'application/json',
      // });
      // const authToken = res.headers.authorization;
      // const { role } = res.data.data;
      // const username = res.data.data.name;
      // const { id } = res.data.data;
      // setAuth({
      //   role,
      //   authToken,
      //   email,
      //   username,
      //   id,
      // });
      // localStorage.setItem(
      //   'Token',
      //   JSON.stringify({ authToken, username, id, role }),
      // );
      const loginResponse = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pwd,
        }),
      });

      if (!loginResponse.ok) {
        toast.error('Login failed');
        throw new Error('Error logging in');
      }

      toast.success('Login successful');

      const userData = await loginResponse.json();
      console.log('Login successful:', userData);
      const { token } = userData;
      console.log('NA THE TOKEN BE THIS :', token);
      // Store user session or token in your frontend application
      // For example, you can use localStorage or sessionStorage
      localStorage.setItem('userToken', token);
      setEmail('');
      setPwd('');
      navigate('/app');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="rounded-1 login-register-style">
      <p
        ref={errRef}
        className={errMsg ? 'errMsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="register-content">
        <h1 className="header">Sign In</h1>
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            placeholder="Email"
            required
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoComplete="on"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn-color text-light">
            Sign In
          </button>
        </form>
        <p className="sign-in-p">
          Need an Account?
          <br />
          <Link to="/register" className="text-light go-sign">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Login;

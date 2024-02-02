/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FaTwitter,
  FaFacebookF,
  FaVimeoV,
  FaPinterestP,
} from 'react-icons/fa6';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/seAuth';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { authToken, role } = JSON.parse(localStorage.getItem('Token')) || {};
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const handleLogout = async () => {
    setAuth({});
    localStorage.removeItem('Token');
    try {
      if (authToken) {
        await axios.delete('http://localhost:3000/auth/logout', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Logout Successfully');
      }
    } catch (err) {
      // Display an error message to the user
      toast.error('Oops! Failed to logout');
    }
    // Regardless of success or failure, navigate to the login page
    navigate('/login');
  };
  return (
    <>
      <div className="mob-nav">
        <FontAwesomeIcon
          icon={faBars}
          className="humburger"
          onClick={toggleSidebar}
        />
      </div>
      <div className={`side-bar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>
        <div className="sidebar-links-container">
          <Link
            to="/app"
            className={`nav-link ${
              location.pathname === '/app' ? 'active' : ''
            }`}
            onClick={closeSidebar}
          >
            Doctors
          </Link>
          {role === 'admin' && (
            <>
              <Link
                to="/add-doctor"
                className={`nav-link ${
                  location.pathname === '/add-doctor' ? 'active' : ''
                }`}
                onClick={closeSidebar}
              >
                Add Doctor
              </Link>
              <Link
                to="/doctors/delete"
                className={`nav-link ${
                  location.pathname === '/doctors/delete' ? 'active' : ''
                }`}
                onClick={closeSidebar}
              >
                Delete Doctor
              </Link>
            </>
          )}
          <Link
            to="/reservations"
            className={`nav-link ${
              location.pathname === '/reservations' ? 'active' : ''
            }`}
            onClick={closeSidebar}
          >
            Reservations
          </Link>
          <Link
            to="/reserve-nav"
            className={`nav-link ${
              location.pathname === '/reserve-nav' ? 'active' : ''
            }`}
            onClick={closeSidebar}
          >
            Reserve Form
          </Link>
          <button
            disabled={!authToken}
            onClick={handleLogout}
            type="button"
            className="list-group-item list-group-item-action nav-logout"
          >
            Log Out
          </button>
        </div>
        <div className="license-container">
          <div className="nav-icons">
            <FaTwitter />
            <FaFacebookF />
            <FaVimeoV />
            <FaPinterestP />
          </div>
          <p className="license">&copy; 2023 Doctor Doctors booking</p>
          <p className="license">All rights reserved.</p>
        </div>
      </div>
    </>
  );
};
export default Navbar;

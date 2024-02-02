/* eslint-disable react/function-component-definition */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaVimeoV,
} from 'react-icons/fa6';
import logo from '../assets/logo.png';
import useAuth from '../hooks/seAuth';

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { authToken, role } = localStorage.getItem('userToken') || {};
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const handleLogout = async () => {
    setAuth({});
    localStorage.removeItem('userToken');
    try {
      if (authToken) {
        await fetch('http://localhost:3000/doctors', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Include the authorization token
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

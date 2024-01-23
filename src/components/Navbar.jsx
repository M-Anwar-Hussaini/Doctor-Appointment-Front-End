import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/doctors">Doctors</NavLink>
      <NavLink to="/doctors/:id">Doctors</NavLink>
      <NavLink to="/appointments">Appointments</NavLink>
    </ul>
  </nav>
);

export default Navbar;

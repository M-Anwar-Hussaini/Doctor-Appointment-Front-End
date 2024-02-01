/* eslint-disable react/function-component-definition */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import RequireAuth from './components/RequireAuth';s
import AddDoctorsForm from './components/doctors/AddDoctorsForm';
import Session from './components/session/Session';
import MainPage from './components/doctors/MainPage';
import DeleteDoctor from './components/doctors/DeleteDoctor';
import Reservations from './components/reservations/Reservations';
import DoctorDetails from './components/details/DoctorDetails';
import ReserveNav from './components/reserve/ReserveNav';
import ReserveDetails from './components/reserve/ReserveDetails';

const App = () => (
  <Routes>
    <Route path="/" element={<Session />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    {/* <Route element={<RequireAuth />}> */}
    <Route exact path="/add-doctor" element={<AddDoctorsForm />} />
    <Route path="/main-page" element={<MainPage />} />
    <Route path="/details/:doctorId" element={<DoctorDetails />} />
    <Route path="/doctors/delete" element={<DeleteDoctor />} />
    <Route path="/reservations" element={<Reservations />} />
    <Route path="/reserve-nav" element={<ReserveNav />} />
    <Route path="/reserve-details/:doctorId" element={<ReserveDetails />} />
    {/* </Route> */}
  </Routes>
);

export default App;

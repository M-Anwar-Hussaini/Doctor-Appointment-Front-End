import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorForm from './component/Doctor/DoctorForm';
import ReservationForm from './component/Reservation/ReservationForm';
import DoctorsList from './component/Doctor/DoctorList';
import LoginForm from './component/Auth/LoginForm';
import SignupForm from './component/Auth/SignupForm';
import ReservationList from './component/Reservation/ReservationList';
import DoctorCreationButton from './component/Doctor/DoctorCreationButton'; // Import the DoctorCreationButton component
import AuthProvider from './component/Auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/create-doctor" element={<DoctorForm />} />
          {/* <Route path="/create-doctor/:userId" element={<DoctorForm />} /> */}
          <Route path="/reservation/:doctorId" element={<ReservationForm />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/" element={<DoctorCreationButton />} />
          {' '}
          {/* Add the DoctorCreationButton route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorForm from './component/Doctor/DoctorForm';
import ReservationForm from './component/Reservation/ReservationForm';
import DoctorsList from './component/Doctor/DoctorList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-doctor" element={<DoctorForm />} />
        <Route path="/reservation/:doctorId" element={<ReservationForm />} />
        <Route path="/doctors" element={<DoctorsList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

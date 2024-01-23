import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Doctor from './components/doctor/DoctorDetails';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors">
          <Route index element={<Doctors />} />
          <Route path="/doctors/:id" element={<Doctor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

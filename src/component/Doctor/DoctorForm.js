import React, { useState } from 'react';
import './Styles/Doctorform.css';

const DoctorForm = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startingShift, setStartingShift] = useState('');
  const [endingShift, setEndingShift] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      picture,
      speciality,
      email,
      phone,
      starting_shift: startingShift, // Corrected key name
      ending_shift: endingShift, // Corrected key name
    };

    try {
      const response = await fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Doctor created successfully
        console.log('Doctor created successfully');
        // Reset form fields
        setName('');
        setPicture('');
        setSpeciality('');
        setEmail('');
        setPhone('');
        setStartingShift('');
        setEndingShift('');
      } else {
        // Error creating doctor
        console.error('Failed to create doctor');
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <>
      <h1>DOCTORS FORM</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="name">
          Name:
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label htmlFor="picture">
          Picture URL:
          <input type="text" id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required />
        </label>
        <label htmlFor="speciality">
          Speciality:
          <input type="text" id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label htmlFor="phone">
          Phone:
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label htmlFor="startingShift">
          Starting Shift (HH:MM):
          <input type="text" id="startingShift" value={startingShift} onChange={(e) => setStartingShift(e.target.value)} pattern="[0-2][0-9]:00" required />
        </label>
        <label htmlFor="endingShift">
          Ending Shift (HH:MM):
          <input type="text" id="endingShift" value={endingShift} onChange={(e) => setEndingShift(e.target.value)} pattern="[0-2][0-9]:00" required />
        </label>

        <button type="submit">Create Doctor</button>
      </form>
    </>
  );
};

export default DoctorForm;

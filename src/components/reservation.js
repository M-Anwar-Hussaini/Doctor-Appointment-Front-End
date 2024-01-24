// ReservationForm.js
import React, { useState } from 'react';
import '../styles/reservation.css'; // Import the associated CSS file

const ReservationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: 'Logged-in User',
    doctor: 'Current Doctor',
    date: '',
    city: '',
    description: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit form data to the table or API
    console.log('Form submitted:', formData);
    // Reset the form fields after submission (optional)
    setFormData({
      username: 'Logged-in User',
      doctor: 'Current Doctor',
      date: '',
      city: '',
      description: '',
    });
  };

  return (
    <div className="reservation-form-container">
      <h2 className="form-title">Reservation Form</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <p className="form-input">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} readOnly />
        </p>

        <p className="form-input">
          <label htmlFor="doctor">Doctor:</label>
          <input type="text" id="doctor" name="doctor" value={formData.doctor} readOnly />
        </p>

        <p className="form-input">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </p>

        <p className="form-input">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </p>

        <p className="form-input">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </p>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;

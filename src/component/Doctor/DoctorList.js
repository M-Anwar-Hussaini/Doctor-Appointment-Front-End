import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Styles/DoctorsList.css';
import AuthContext from '../Auth/AuthContext';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const { authToken, setAuthToken } = useContext(AuthContext);

  // Function to extract time from datetime string
  const extractTime = (datetimeString) => {
    const time = new Date(datetimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  };

  useEffect(() => {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('userToken');
    setAuthToken(token);
  }, []);
  console.log(authToken);
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors', {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Convert starting_shift and ending_shift to time format
        const formattedData = data.map((doctor) => ({
          ...doctor,
          starting_shift: extractTime(doctor.starting_shift),
          // starting_shift: doctor.starting_shift,
          ending_shift: extractTime(doctor.ending_shift),
        }));
        setDoctors(formattedData);
        console.log(formattedData);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
        },
      });
      if (response.ok) {
        // Remove the deleted doctor from the list
        setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== doctorId));
        console.log('Doctor deleted successfully');
      } else {
        console.error('Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="doctors-list-container">
      <h2>Doctors</h2>
      <ul className="doctors-list">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="doctor-item">
            <Link to={`/reservation/${doctor.id}`}>
              <img src={doctor.picture} alt={doctor.name} />
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.speciality}</p>
                <p>
                  Email:
                  {' '}
                  {doctor.email}
                </p>
                <p>
                  Phone:
                  {' '}
                  {doctor.phone}
                </p>
                <p>
                  Shift:
                  {' '}
                  {doctor.starting_shift}
                  {' '}
                  -
                  {' '}
                  {doctor.ending_shift}
                </p>
              </div>
            </Link>
            <button type="button" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorsList;

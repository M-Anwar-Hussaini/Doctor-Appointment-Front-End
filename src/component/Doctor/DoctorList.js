import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Styles/DoctorsList.css';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  // Function to extract time from datetime string
  const extractTime = (datetimeString) => {
    const time = new Date(datetimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors');
      if (response.ok) {
        const data = await response.json();
        // Convert starting_shift and ending_shift to time format
        const formattedData = data.map((doctor) => ({
          ...doctor,
          starting_shift: extractTime(doctor.starting_shift),
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;

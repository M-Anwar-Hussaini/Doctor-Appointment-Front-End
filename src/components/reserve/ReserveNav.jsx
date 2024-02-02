/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/reservation.css';

function CityDropdown() {
  const [doctors, setDoctors] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [availableSlots, setAvailableSlots] = useState([]);

  const extractTime = (datetimeString) => {
    const time = new Date(datetimeString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors', {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the auth token in the headers
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

  // fetch availble slots
  const fetchAvailableSlots = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/doctors/${doctorId}/available_slots`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
          },
        },
      );
      console.log('THIS IS THE doctorId', doctorId);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAvailableSlots(data);
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  useEffect(() => {
    setUserToken(localStorage.getItem('userToken'));
    fetchDoctors();
  }, []);

  return (
    <div className="reserve-inputSection">
      <label htmlFor="doctorList" className="reserve-label">
        <select id="doctorList" name="doctorList" required>
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              className="doctor-item"
              onChange={() => fetchAvailableSlots(doctor.id)}
            >
              {doctor.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

CityDropdown.propTypes = {
  onSelectCity: PropTypes.func.isRequired,
};

function ReserveNav() {
  const navigate = useNavigate();
  const { username, id } = JSON.parse(localStorage.getItem('Token')) || {};
  const idNumber = parseInt(id, 10);
  const { doctors } = useSelector((state) => state.doctors);
  const filteredDoctors = doctors.filter((doctor) => !doctor.is_removed);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  if (doctors.length === 0) {
    navigate('/app');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      city: selectedCity,
      doctor_id: selectedDoctor,
      test_date: selectedDate,
      user_id: idNumber,
      // start_time: parseInt(selectedSlotDetails.start_time.split(':')[0], 10),
      // Convert start_time to a number
      // end_time: parseInt(selectedSlotDetails.end_time.split(':')[0], 10),
      // day_of_month: parseInt(selectedSlotDetails.day_of_month, 10),
      // day_of_week: selectedSlotDetails.day_of_week,
      // month: getMonthNumber(selectedSlotDetails.month),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/doctors/${id}/reservations`, // change to doctor id
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to make reservation.');
      }

      await response.json();
      navigate('/reservations');
    } catch (error) {
      throw new Error(error || 'Failed to make reservation.');
    }
  };

  return (
    <div className="reserve-container">
      <div className="background">
        <div className="reserve-back-btn">
          <Link to="/app"> Go Back to Main Page</Link>
        </div>

        <h3 id="reserve-title">Reserve a Test Drive</h3>
        <div className="reserve-content">
          <p>
            <span>Name:</span>
            <span>{username}</span>
          </p>
          <form className="form-reserve" onSubmit={handleSubmit}>
            <div className="reserve-inputSection">
              <label htmlFor="reserve-doctorSelect" className="reserve-label">
                <select
                  id="reserve-doctorSelect"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Select a doctor</option>
                  {filteredDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <CityDropdown onSelectCity={(city) => setSelectedCity(city)} />
            <div className="reserve-inputSection">
              <label htmlFor="reserve-date" className="reserve-label">
                <input
                  type="datetime-local"
                  id="reserve-date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="reserve-subDiv">
              <button className="reserve-btn-form" type="submit">
                Reserve
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserveNav;

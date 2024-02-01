/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../assets/css/reservation.css';

function CityDropdown({ onSelectCity }) {
  const cityItems = useSelector((store) => store.cities);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(cityItems.cityItems);
  }, [cityItems.cityItems]);

  const handleCityChange = (event) => {
    onSelectCity(event.target.value);
  };

  return (
    <div className="reserve-inputSection">
      <label htmlFor="cityList" className="reserve-label">
        <select
          id="cityList"
          name="cityList"
          onChange={handleCityChange}
          required
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.city}>
              {city.city}
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
    navigate('/main-page');
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
          <Link to="/main-page"> Go Back to Main Page</Link>
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

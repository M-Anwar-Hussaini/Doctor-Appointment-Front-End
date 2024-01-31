import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
          <option value="">Select a City</option>
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

function ReserveDetails() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { doctors } = useSelector((state) => state.doctors);
  const filteredDoctors = doctors.filter((doctor) => !doctor.is_removed);
  const doctordName = doctors.filter(
    (item) => item.id === parseInt(doctorId, 10),
  );

  const { username, id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(doctordName[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const idNumber = parseInt(id, 10);

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
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${id}/reservations`,
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
          <Link to="/main-page">Go Back</Link>
        </div>
        <h3 id="reserve-title">Reserve a Test Drive</h3>
        <div className="reserve-content">
          <p>
            <span>User:</span>
            <span>{username}</span>
          </p>
          <form className="form-reserve" onSubmit={handleSubmit}>
            <div className="reserve-inputSection">
              <label htmlFor="reserve-doctorSelect" className="reserve-label">
                <select
                  id="reserve-doctorSelect"
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setSelectedDoctor(doctordName[0].id);
                    } else {
                      setSelectedDoctor(e.target.value);
                    }
                  }}
                  required
                  defaultValue={doctordName[0].id}
                >
                  <option>Select a doctor</option>
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
              <label
                htmlFor="reserve-date"
                className="reserve-label"
                aria-label="Label"
              >
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

export default ReserveDetails;

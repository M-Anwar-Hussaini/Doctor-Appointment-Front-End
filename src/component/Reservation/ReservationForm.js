import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Doctor/Styles/ReservationForm.css';

function ReservationForm() {
  const { doctorId } = useParams();

  const [reservationData, setReservationData] = useState({
    start_time: '', // Convert start_time to a number
    end_time: '',
    day_of_month: '',
    day_of_week: '',
    month: '',
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    // Fetch available slots for the doctor with the given doctorId
    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(`http://localhost:3000/doctors/${doctorId}/available_slots`);
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

    fetchAvailableSlots();
  }, [doctorId]);

  const getMonthNumber = (monthName) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames.indexOf(monthName) + 1; // Months are 1-indexed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'selectedSlot') {
      const selectedSlotDetails = availableSlots.find((slot) => slot.start_time === value);
      setReservationData((prevData) => ({
        ...prevData,
        start_time: parseInt(selectedSlotDetails.start_time.split(':')[0], 10), // Convert start_time to a number
        end_time: parseInt(selectedSlotDetails.end_time.split(':')[0], 10),
        day_of_month: selectedSlotDetails.day_of_month,
        day_of_week: selectedSlotDetails.day_of_week,
        month: getMonthNumber(selectedSlotDetails.month),
      }));
      setSelectedSlot(value);
    } else {
      setReservationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to create the reservation
    fetch(`http://localhost:3000/doctors/${doctorId}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservation: { ...reservationData } }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          alert('Reservation successfully created.');
          setReservationData({
            time_booked: '',
            day_of_month: '',
            day_of_week: '',
            month: '',
          });
        } else {
          // Handle error
          alert('Failed to create reservation. Slot may not be available.');
        }
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        // alert('An error occurred while creating the reservation.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="selectedSlot">
        Select Slot:
        <select id="selectedSlot" name="selectedSlot" value={selectedSlot} onChange={handleChange}>
          <option value="">Select a slot...</option>
          {availableSlots.map((slot) => (
            <option key={slot.id} value={slot.start_time}>
              {slot.start_time}
              ,
              {slot.end_time}
              ,
              {slot.day_of_month}
              ,
              {slot.day_of_week}
              ,
              {slot.month}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="start_time">
        Start Time:
        <input type="number" id="start_time" name="start_time" value={reservationData.start_time} onChange={handleChange} />
      </label>
      <label htmlFor="end_time">
        End Time:
        <input
          type="text"
          id="end_time"
          name="end_time"
          value={reservationData.end_time}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="day_of_month">
        Day of Month:
        <input type="number" id="day_of_month" name="day_of_month" value={reservationData.day_of_month} onChange={handleChange} />
      </label>
      <label htmlFor="day_of_week">
        Day of Week:
        <input type="text" id="day_of_week" name="day_of_week" value={reservationData.day_of_week} onChange={handleChange} />
      </label>
      <label htmlFor="month">
        Month:
        <input type="number" id="month" name="month" value={reservationData.month} onChange={handleChange} />
      </label>
      <button type="submit">Create Reservation</button>
    </form>
  );
}

export default ReservationForm;

import React, { useState, useEffect } from 'react';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/reservations_with_doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Reservation List</h2>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Doctor Name</th>
            <th>Reservation Time</th>
            <th>Day of Week</th>
            <th>Month</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.doctor_name}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.day_of_week}</td>
              <td>{reservation.month}</td>
              <td>{reservation.created_at_formatted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;

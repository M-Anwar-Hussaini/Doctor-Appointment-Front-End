import React, { useState, useEffect } from 'react';
// import AuthContext from '../Auth/AuthContext';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  // const { authToken, setAuthToken } = useContext(AuthContext);
  // useEffect(() => {
  //   // Retrieve the authentication token from local storage
  //   const token = localStorage.getItem('userToken');
  //   setAuthToken(token);
  // }, []);
  const token = localStorage.getItem('userToken');
  console.log(token);
  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:3000/all_reservations', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the auth token in the headers
        },
      }); // Updated endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      console.log(data);
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
            <th>User Name</th>
            {' '}
            {/* Add a new table heading for user name */}
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
              <td>{reservation.user_name}</td>
              {' '}
              {/* Display user name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;

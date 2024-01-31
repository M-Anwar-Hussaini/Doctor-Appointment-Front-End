/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { fetchReservations } from '../../redux/features/reservationsSlice';
import '../../assets/css/deleteDoctor.css';

const Reservations = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};

  useEffect(() => {
    dispatch(fetchReservations(id));
  }, [dispatch, id]);

  const { reservations } = useSelector((state) => state.reservations);

  return (
    <>
      <Navbar />
      <div className="delete-doctors-container">
        <h3 id="deleteTitle">My Reservations</h3>
        <table>
          <thead>
            <tr>
              <th className="delete-doctor-name">
                <div className="header-container">Doctor Name</div>
              </th>
              <th className="actions">Test date</th>
              <th className="actions">City</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td className="delete-doctor-name" colSpan="3">
                  No reservations
                </td>
              </tr>
            )}
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="delete-doctor-name">
                  {reservation.doctor.name}
                </td>
                <td className="delete-doctor-name">{reservation.test_date}</td>
                <td className="delete-doctor-name">{reservation.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;

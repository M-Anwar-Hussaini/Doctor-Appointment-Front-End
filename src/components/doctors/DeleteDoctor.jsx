/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  doctorRemoved,
  updateDoctors,
} from '../../redux/features/doctorsSlice';
import Navbar from '../Navbar';
import '../../assets/css/deleteDoctor.css';

const DeleteDoctor = () => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const { doctors } = useSelector((state) => state.doctors);
  const filteredDoctors = doctors.filter((doctor) => !doctor.is_removed);

  const handleUpdateDoctor = (doctorId, isRemoved) => {
    const data = {
      id,
      doctorId,
      doctor: {
        isRemoved,
      },
    };

    dispatch(updateDoctors(data));
    dispatch(doctorRemoved(doctorId));
  };

  return (
    <>
      <Navbar />
      <div className="delete-doctors-container">
        <h3 id="deleteTitle">Available Doctors List</h3>
        <table>
          <thead>
            <tr>
              <th className="delete-doctor-name">
                <div className="header-container">Doctor Name</div>
              </th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="delete-doctor-name">{doctor.name}</td>
                <td className="actions">
                  <button
                    className="delete-doctorBtn"
                    type="button"
                    onClick={() => handleUpdateDoctor(doctor.id, true)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeleteDoctor;

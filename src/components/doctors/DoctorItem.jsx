/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorById } from '../../redux/features/doctorsSlice';

const DoctorItem = ({ doctor, classNames }) => {
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatch = (doctorId) => {
    dispatch(fetchDoctorById({ userId: id, doctorId }));
    navigate(`/details/${doctorId}`);
  };

  return (
    <li>
      <button
        onClick={() => handleDispatch(doctor.id)}
        className={classNames.button}
        type="button"
      >
        <div className={classNames.doctorBody}>
          <div className={classNames.imageContainer}>
            <img
              src={doctor.image}
              alt={doctor.name}
              className={classNames.image}
            />
          </div>
          <h6 className={classNames.title}>{doctor.name}</h6>
          <p className={classNames.discription}>{doctor.description}</p>
        </div>
      </button>
    </li>
  );
};

DoctorItem.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  classNames: PropTypes.shape({
    button: PropTypes.string,
    doctorBody: PropTypes.string,
    imageContainer: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    discription: PropTypes.string,
  }).isRequired,
};

export default DoctorItem;

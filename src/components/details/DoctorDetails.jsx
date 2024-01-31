/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { fetchDoctorById } from '../../redux/features/doctorsSlice';
import '../../assets/css/detailsPage.css';

function DoctorDetails() {
  const dispatch = useDispatch();
  const { userId, doctorId } = useParams();
  const doctorDetails = useSelector((state) => state.doctors.doctorById);

  useEffect(() => {
    if (userId && doctorId) {
      dispatch(fetchDoctorById({ userId, doctorId }));
    }
  }, [dispatch, userId, doctorId]);

  return (
    <>
      <Navbar />
      <div className="details-all-page">
        {doctorDetails.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="Details">
            <img src={doctorDetails.image} alt={doctorDetails.name} />
            <div className="all-details">
              <h3>{doctorDetails.name}</h3>
              <p>Color: {doctorDetails.color}</p>
              <p>Year: {doctorDetails.year}</p>
              <p>Finance Fee: {doctorDetails.finance_fee}</p>
              <p>Option to Purchase: {doctorDetails.option_to_purchase}</p>
              <p>Total Amount Payable: {doctorDetails.total_amount_payable}</p>
              <p>Duration: {doctorDetails.duration} months</p>
              <Link to={`/reserveDetails/${doctorId}`}> Reserve </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DoctorDetails;

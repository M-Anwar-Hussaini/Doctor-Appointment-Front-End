/* eslint-disable react/function-component-definition */
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Doctorousel from 'react-multi-carousel';
import { doctorRemoved } from '../../redux/features/doctorsSlice';
import { getCities } from '../../redux/cities/CitiesSlice';
import Navbar from '../Navbar';
import DoctorItem from './DoctorItem';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/carouselStyle.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const { cityItems } = useSelector((store) => store.cities);
  useEffect(() => {
    if (cityItems.length === 0) {
      dispatch(getCities());
    }
  });
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 765 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 765, min: 0 },
      items: 1,
    },
  };

  const handleDoctorRemoved = (doctorId) => {
    dispatch(doctorRemoved(doctorId));
  };
  const filteredDoctors = doctors.filter((doctor) => !doctor.is_removed);

  return (
    <>
      <Navbar />
      <div className="main-page-container">
        <Doctorousel responsive={responsive}>
          {filteredDoctors.map((doctor) => (
            <ul className="doctor-item" key={doctor.id}>
              <DoctorItem
                key={doctor.id}
                doctor={doctor}
                handleDoctorRemoved={handleDoctorRemoved}
                classNames={{
                  button: 'btn btn-outline-primary btn-doctor-item',
                  doctorBody: 'doctord-body',
                  imageContainer: 'image-container',
                  image: 'doctord-img-top',
                  title: 'doctord-title',
                  discription: 'doctord-text',
                }}
              />
            </ul>
          ))}
        </Doctorousel>
      </div>
    </>
  );
};

export default MainPage;

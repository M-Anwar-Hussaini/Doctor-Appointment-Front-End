import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { addNewDoctors, fetchDoctors } from '../../redux/features/doctorsSlice';
import Navbar from '../Navbar';
import '../../assets/css/doctorForm.css';

function AddDoctorsForm() {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startingShift, setStartingShift] = useState('');
  const [endingShift, setEndingShift] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      picture,
      speciality,
      email,
      phone,
      starting_shift: startingShift,
      ending_shift: endingShift,
    };
    console.log(formData);
    try {
      // Retrieve the token from local storage
      const authToken = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the authorization token
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Doctor created successfully
        toast.success('Doctor created successfully');
        // Reset form fields
        setName('');
        setPicture('');
        setSpeciality('');
        setEmail('');
        setPhone('');
        setStartingShift('');
        setEndingShift('');
      } else {
        // Error creating doctor
        console.error('Failed to create doctor');
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-doctor-container">
        <div className="add-doctor-doctord">
          <h2 id="add-doctor-title">Add New Doctor</h2>
          <div className="doctord-body">
            <form>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="doctors_name"
                  id="doctors_id"
                  placeholder="Doctor name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="doctors_photo"
                  id="doctors_photo"
                  placeholder="Doctor picture url"
                  onChange={(e) => setPicture(e.target.value)}
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="specialty"
                  className="form-label d-block mb
                -1"
                >
                  Specialty:
                </label> */}
                <input
                  className="input-half"
                  type="text"
                  name="doctor_color"
                  // id="doctor_color"
                  placeholder="Speciality"
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="specialty"
                  className="form-label d-block mb
                -1"
                >
                  Specialty:
                </label> */}
                <input
                  className="input-half"
                  type="email"
                  name="doctor_color"
                  // id="doctor_color"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="specialty"
                  className="form-label d-block mb
                -1"
                >
                  Specialty:
                </label> */}
                <input
                  className="input-half"
                  type="tel"
                  name="doctor_color"
                  // id="doctor_color"
                  placeholder="Speciality"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="specialty"
                  className="form-label d-block mb
                -1"
                >
                  Specialty:
                </label> */}
                <input
                  className="input-half"
                  type="text"
                  name="doctor_color"
                  // id="doctor_color"
                  placeholder="Starting shift"
                  onChange={(e) => setStartingShift(e.target.value)}
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="specialty"
                  className="form-label d-block mb
                -1"
                >
                  Specialty:
                </label> */}
                <input
                  className="input-half"
                  type="text"
                  name="doctor_color"
                  // id="doctor_color"
                  placeholder="ending shift"
                  onChange={(e) => setEndingShift(e.target.value)}
                />
              </div>
              {/* <div className="add-doctor-twoInput">
                <div className="mb-2">
                  <input
                    className="input-half"
                    type="text"
                    name="doctor_color"
                    id="doctor_color"
                    placeholder="Doctor color"
                    onChange={(e) => {
                      colorHandlers(e);
                    }}
                  />
                </div>
                <div className="mb-d">
                  <input
                    className="input-half"
                    type="text"
                    name="doctors_model"
                    id="doctors_model"
                    placeholder="Doctor year"
                    onChange={(e) => {
                      YearHandlers(e);
                    }}
                  />
                </div>
              </div>
              <div className="add-doctor-twoInput">
                <div className="mb-2">
                  <input
                    className="input-half"
                    type="text"
                    name="doctors_financefee"
                    id="doctors_financefee"
                    placeholder="Doctor finance fee"
                    onChange={(e) => {
                      financeFeeHandlers(e);
                    }}
                  />
                </div>
                <div className="mb-d">
                  <input
                    className="input-half"
                    type="text"
                    name="doctors"
                    id="doctors"
                    placeholder="Option to purchase"
                    onChange={(e) => {
                      optionPurchaseHandlers(e);
                    }}
                  />
                </div>
              </div>
              <div className="add-doctor-twoInput">
                <div className="mb-2">
                  <input
                    className="input-half"
                    type="text"
                    name="doctors_totalAmount"
                    id="doctors_totalAmount"
                    placeholder="Doctor total Amount"
                    onChange={(e) => {
                      totalAmountHandlers(e);
                    }}
                  />
                </div>
                <div className="mb-d">
                  <input
                    className="input-half"
                    type="text"
                    name="doctors_duration"
                    id="doctors_Duration"
                    placeholder="Doctor duration"
                    onChange={(e) => {
                      DurationHandlers(e);
                    }}
                  />
                </div>
              </div>
              <div className="mb-2 div-textarea">
                <textarea
                  cols="30"
                  rows="3"
                  className="form-control"
                  type="text"
                  name="doctors_discription"
                  id="doctors_Discription"
                  placeholder="Doctor description"
                  onChange={(e) => {
                    DescriptionHandlers(e);
                  }}
                />
              </div> */}
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <button
                  className="add-doctor-btn btn-primary"
                  type="button"
                  name="Add-Doctors"
                  id="AddDoctors"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDoctorsForm;

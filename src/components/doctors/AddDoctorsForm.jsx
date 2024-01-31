import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewDoctors, fetchDoctors } from '../../redux/features/doctorsSlice';
import Navbar from '../Navbar';
import '../../assets/css/doctorForm.css';

function AddDoctorsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem('Token')) || {};
  const [name, setTitle] = useState('');
  const [image, setPhoto] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [financeFee, setFinanceFee] = useState('');
  const [optionPurchase, setOptionPurchase] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDiscription] = useState('');
  const [duration, setDuration] = useState('');
  const [pending, setPending] = useState('Add Doctor');

  const nameHandlers = (e) => setTitle(e.target.value);
  const photoHandlers = (e) => setPhoto(e.target.value);
  const colorHandlers = (e) => setColor(e.target.value);
  const financeFeeHandlers = (e) => setFinanceFee(e.target.value);
  const optionPurchaseHandlers = (e) => setOptionPurchase(e.target.value);
  const totalAmountHandlers = (e) => setTotalAmount(e.target.value);
  const DescriptionHandlers = (e) => setDiscription(e.target.value);
  const YearHandlers = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setYear(parsedValue);
  };
  const DurationHandlers = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseInt(value, 10);
    setDuration(parsedValue);
  };

  const postDispatcher = () => {
    const doctorsDetail = {
      name,
      image,
      year,
      color,
      finance_fee: financeFee,
      option_to_purchase: optionPurchase,
      total_amount_payable: totalAmount,
      description,
      duration,
    };

    setPending('...Adding new doctor');

    dispatch(addNewDoctors({ doctor: doctorsDetail, id }));

    setTimeout(() => {
      dispatch(fetchDoctors(id));
      setPending('Add Doctor');
      navigate('/main-page');
    }, 1000);
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
                  onChange={(e) => {
                    nameHandlers(e);
                  }}
                />
              </div>
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="doctors_photo"
                  id="doctors_photo"
                  placeholder="Doctor image url"
                  onChange={(e) => {
                    photoHandlers(e);
                  }}
                />
              </div>
              <div className="add-doctor-twoInput">
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
              </div>
              <div className="mb-2 d-flex justify-content-center align-items-center">
                <button
                  className="add-doctor-btn btn-primary"
                  type="button"
                  name="Add-Doctors"
                  id="AddDoctors"
                  onClick={() => {
                    postDispatcher();
                  }}
                >
                  {pending}
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

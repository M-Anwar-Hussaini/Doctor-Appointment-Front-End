import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Doctor = () => {
  const { id } = useParams();

  return (
    <div className="h-screen gap-3 md:flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <div>
          <img
            src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg"
            alt="doctor"
            className="w-full object-cover"
          />
        </div>
        <Link
          to={`/doctors/${id}/delete`}
          className="bg-red-400 text-white text-center rounded-full p-3 px-5"
        >
          Delete
        </Link>
      </div>
      <div className="p-3">
        <h2 className="text-2xl font-bold py-4">Doctor name here</h2>
        <div className="flex gap-4 flex-col">
          <ul className="text-left">
            <li className="odd:bg-slate-200 p-2 flex items-center">
              <div className="font-bold">Speciality information</div>
              <div>Speciality</div>
            </li>
            <li className="odd:bg-slate-200 p-2 flex items-center">
              <div className="font-bold">E-mail</div>
              <div>dname@clinic.org</div>
            </li>
            <li className="odd:bg-slate-200 p-2 flex items-center">
              <div className="font-bold">Phone number</div>
              <div> (000) 888 888 888</div>
            </li>
          </ul>
          <Link
            to={`/doctors/${id}/reserve`}
            className="bg-slate-700 text-white text-center rounded-full p-3"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

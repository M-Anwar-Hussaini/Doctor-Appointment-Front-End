// import React, { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import './Styles/Doctorform.css';

// function DoctorCreationButton({ currentUser }) {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const history = useHistory();
//   const { userId } = useParams();

//   useEffect(() => {
//     if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'Admin')) {
//       setIsAdmin(true);
//     } else {
//       setIsAdmin(false);
//     }
//   }, [currentUser]);

//   const handleCreateDoctorClick = () => {
//     if (isAdmin) {
//       // Allow the user to create a doctor
//       history.push(`/create-doctor/${userId}`);
//     } else {
//       // Display a message or disable the button indicating that
//       // the user is not allowed to create a doctor
//       alert('You do not have permission to create a doctor.');
//     }
//   };

//   return (
//     <div className="doctor-creation-button-container">
//       {isAdmin && (
//         <button type="button" className="doctor-creation-button"
// onClick={handleCreateDoctorClick}>
//           Create Doctor
//         </button>
//       )}
//     </div>
//   );
// }

// export default DoctorCreationButton;

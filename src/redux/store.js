import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './features/doctorsSlice';
import citiesReducer from './cities/CitiesSlice';
import reservationsReducer from './features/reservationsSlice';
import availableSlotsReducer from './features/availableSlotsSlice'; // Import the availableSlotsReducer

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    cities: citiesReducer,
    reservations: reservationsReducer,
    reservation: availableSlotsReducer, // Include the availableSlotsReducer
  },
});

export default store;

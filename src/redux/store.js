import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './features/doctorsSlice';
import citiesReducer from './cities/CitiesSlice';
import reservationsReducer from './features/reservationsSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    cities: citiesReducer,
    reservations: reservationsReducer,
  },
});

export default store;

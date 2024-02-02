import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  doctors: [],
  doctorById: {},
  reservedDoctor: {},
  isLoading: true,
  error: null,
};

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem('userToken'));
      const response = await fetch('http://localhost:3000/doctors', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.json();
    } catch (error) {
      throw Error(error);
    }
  },
);

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async (data) => {
    const authToken = JSON.parse(localStorage.getItem('userToken'));
    // Define 'url' here
    const url = `http://localhost:3000/doctors/${data.doctorId}`;
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((doctor) => {
        data.doctors.push(doctor);
      });
    try {
      // Use 'url' here
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  },
);

export const addNewDoctors = createAsyncThunk(
  'doctors/addNewDoctors',
  async (data) => {
    try {
      const authToken = JSON.parse(localStorage.getItem('userToken'));
      const formData = {
        doctor: data.doctor,
      };

      const response = await fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      toast.success(`Doctor Successfully ${response.statusText} `);
      return response.json();
    } catch (error) {
      toast.error('Opps failed to create Doctor');
      throw Error(error);
    }
  },
);

export const updateDoctors = createAsyncThunk(
  'doctors/updateDoctors',
  async (data) => {
    const { authToken } = data.id;
    const { doctorId } = data;
    const isRemoved = data.doctor.is_removed;

    try {
      const config = {
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
      };
      const baseUrl = `http://localhost:3000/api/v1/users/${data.id}/doctors/${doctorId}`;

      const response = await axios.delete(
        baseUrl,
        JSON.stringify({
          isRemoved,
        }),
        config,
      );
      toast.success(`Doctor Successfully ${response.statusText} `);
      return response.data;
    } catch (error) {
      toast.error('Opps failed to update Doctor');
      throw Error(error);
    }
  },
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    doctorCreated: (state, action) => {
      state.doctors?.push(action.payload);
    },
    reserveDoctor(state, action) {
      const id = action.payload;
      const reserved = state.doctors.doctors.find((doctor) => doctor.id === id);
      state.reservedDoctor = reserved;
    },
    doctorRemoved: (state, action) => {
      const doctor = state.doctors.find(
        (doctor) => doctor.id === action.payload,
      );
      if (doctor) {
        doctor.is_removed = true;
      }
    },
  },
  extraReducers: {
    // Fetch Doctors
    [fetchDoctors.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDoctors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.doctors = action.payload;
    },
    [fetchDoctors.rejected]: (state) => {
      state.isLoading = false;
    },
    // Fetch Doctor By Id
    [fetchDoctorById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDoctorById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.doctorById = action.payload;
    },
    [fetchDoctorById.rejected]: (state) => {
      state.isLoading = false;
    },
    // Add New Doctor
    [addNewDoctors.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewDoctors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.doctors.push(action.payload);
    },
    [addNewDoctors.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const doctorRemoved = (doctorId) => ({
  type: 'doctors/doctorRemoved',
  payload: doctorId,
});
export const getAllDoctors = (state) => state.doctors.doctors;
export default doctorsSlice.reducer;

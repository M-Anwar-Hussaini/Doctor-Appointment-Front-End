import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  availableSlots: [],
  loading: false,
  error: null,
};

export const fetchAvailableSlots = createAsyncThunk(
  'reservation/fetchAvailableSlots',
  async ({ doctorId, authToken }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/doctors/${doctorId}/available_slots`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  },
);

const availableSlotsSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAvailableSlots.pending]: (state) => {
      state.loading = true;
    },
    [fetchAvailableSlots.fulfilled]: (state, action) => {
      state.loading = false;
      state.availableSlots = action.payload;
    },
    [fetchAvailableSlots.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const selectAvailableSlots = (state) => state.reservation.availableSlots;

export default availableSlotsSlice.reducer;

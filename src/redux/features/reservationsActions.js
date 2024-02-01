export const FETCH_AVAILABLE_SLOTS_REQUEST = 'FETCH_AVAILABLE_SLOTS_REQUEST';
export const FETCH_AVAILABLE_SLOTS_SUCCESS = 'FETCH_AVAILABLE_SLOTS_SUCCESS';
export const FETCH_AVAILABLE_SLOTS_FAILURE = 'FETCH_AVAILABLE_SLOTS_FAILURE';

export const fetchAvailableSlotsRequest = () => ({
  type: FETCH_AVAILABLE_SLOTS_REQUEST,
});

export const fetchAvailableSlotsSuccess = (slots) => ({
  type: FETCH_AVAILABLE_SLOTS_SUCCESS,
  payload: slots,
});

export const fetchAvailableSlotsFailure = (error) => ({
  type: FETCH_AVAILABLE_SLOTS_FAILURE,
  payload: error,
});

export const fetchAvailableSlots = (doctorId, authToken) => async (dispatch) => {
  dispatch(fetchAvailableSlotsRequest());
  try {
    const response = await fetch(`http://localhost:3000/doctors/${doctorId}/available_slots`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }
    const data = await response.json();
    dispatch(fetchAvailableSlotsSuccess(data));
  } catch (error) {
    dispatch(fetchAvailableSlotsFailure(error.message));
  }
};

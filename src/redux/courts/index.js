import { createSlice } from '@reduxjs/toolkit';
import { addCourts, sendReview } from '../actions/review';

const initialState = {
  courts: [],
  court: {},
  loading: false,
  message: null,
  error: false,
};

const courtSlice = createSlice({
  name: 'review',
  initialState,
  extraReducers: {
   
     [addCourts.fulfilled]: (state, action) => ({
      ...state,
      reviews: action.payload.data,
      loading: false,
      message: 'review has been recieved',
      error: false,

    }),
  },
});

export default courtSlice.reducer;

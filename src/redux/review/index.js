import { createSlice } from '@reduxjs/toolkit';
import { addCourts, sendReview } from '../actions/review';

const initialState = {
  reviews: [],
  loading: false,
  message: null,
  error: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  extraReducers: {
    [sendReview.fulfilled]: (state, action) => ({
      ...state,
      reviews: action.payload.data,
      loading: false,
      message: 'review has been recieved',
      error: false,

    }),
    [sendReview.pending]: (state, action) => ({
      ...state,
      loading: true,

    }),
    [sendReview.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,

    }),
     [addCourts.fulfilled]: (state, action) => ({
      ...state,
      reviews: action.payload.data,
      loading: false,
      message: 'review has been recieved',
      error: false,

    }),
  },
});

export default reviewSlice.reducer;

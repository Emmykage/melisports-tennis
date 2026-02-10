import { createReducer, createSlice } from '@reduxjs/toolkit';
import { sendMessage, getMessages } from '../actions/message';

const initialState = {
  message: null,
  messages: [],
};

const messageReducer = createSlice({
  initialState,
  name: 'message',
  extraReducers: {
    [sendMessage.fulfilled]: (state, action) => ({
      ...state,
      message: action.payload.message,
      loading: false,
    }),
    [sendMessage.rejected]: (state, action) => ({
      ...state,
      message: action.payload.message,
      loading: false,
    }),
    [sendMessage.pending]: (state, action) => ({
      ...state,
      message: null,
      loading: true,
    }),

    [getMessages.fulfilled]: (state, action) => ({
      ...state,
      messages: action.payload.message,
      loading: false,
    }),
    [getMessages.rejected]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [getMessages.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
  },

});

export default messageReducer.reducer;

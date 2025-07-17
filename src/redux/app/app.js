import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoader: false,
  alert: {
    isOpen: false,
    message: null,
    error: false,

  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoader: (state) => ({
      ...state,
      isLoader: true,

    }),
    closeLoader: (state) => ({
      ...state,
      isLoader: false,

    }),
    toggleAlert: (state, action) => ({
      ...state,
      alert: {
        ...state.alert,
        isOpen: action.payload.isOpen,
        message: action.payload.message,
        error: action.payload.error,

      },

    }),
  },
});

export const { setLoader, closeLoader, toggleAlert } = appSlice.actions;
export default appSlice.reducer;

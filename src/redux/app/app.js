import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoader: false,
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
  },
});

export const { setLoader, closeLoader } = appSlice.actions;
export default appSlice.reducer;

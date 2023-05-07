import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleNav: false,
};

const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openNav: (state) => ({
      ...state,
      toggleNav: true,
    }),
    closeNav: (state) => ({
      ...state,
      toggleNav: false,
    }),
  },
});

export const { openNav, closeNav } = navSlice.actions;
export default navSlice.reducer;

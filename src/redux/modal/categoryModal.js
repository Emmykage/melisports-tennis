import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleModal: false,
};
const catModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => ({
      ...state,
      toggleModal: !state.toggleModal,
    }),
  },
});

export const { setModal } = catModalSlice.actions;
export default catModalSlice.reducer;

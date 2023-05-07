import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  id: '',
};

const delProductSlice = createSlice({
  name: 'delProduct',
  initialState,
  reducers: {
    openDelModal: (state, action) => ({
      ...state,
      isOpen: true,
      id: action.payload,
    }),
    closeDelModal: (state) => ({
      ...state,
      isOpen: false,
    }),
  },
});

export const { openDelModal, closeDelModal } = delProductSlice.actions;
export default delProductSlice.reducer;

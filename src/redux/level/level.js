import { createSlice } from '@reduxjs/toolkit';
import { getLevels } from '../actions/misc';
// import { getProductCategories } from "../actions/product_category";
const initialState = {
  levels: [],
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  extraReducers: {
    [getLevels.fulfilled]: (state, action) => ({
      ...state,
      levels: action.payload,
    }),
  },

});

export default levelSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { filterProducts, getProducts } from '../actions/product';

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  status: 'success',
  error: 'none',
  counter: 0,
  report: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
    extraReducers: {
    [filterProducts.fulfilled]: (state, action) => ({
      ...state,
      products: action.payload

    }),
    [getProducts.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      products: action.payload,
    }),
    
    [getProducts.pending]: (state) => ({
      ...state,
      loading: true,
      status: 'waiting',
    }),
    [getProducts.rejected]: (state, action) =>
      ({
        ...state,
        error: 'No Internet Connection',
        loading: false,
        status: 'failed',
      })

    ,

  },
});

export default productsSlice.reducer;
// export const { filterProducts } = productsSlice.actions;

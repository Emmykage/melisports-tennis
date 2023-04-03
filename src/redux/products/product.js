import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../actions/product';
const initialState = {
  products: [],
  status: "failed",
  error: "none"
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      console.log(action.payload)

      const filtered =  state.products.filter((item) => item.name.toLowerCase().includes(action.payload))
      console.log(action.payload)
      return{
        ...state,
        products: filtered
      }
    }

  },

  extraReducers: {
    [getProducts.fulfilled]: (state, action) => ({
      ...state,
      status: "success",
      products: action.payload,
    }),
    [getProducts.pending]: (state) => ({
      ...state,
      status: "waiting",
    }),
    [getProducts.rejected]: (state, action) => {
      console.log(action.error)
      return     {
      ...state,
      error: action.error,
      status: "failed",
    }
   
  }
  },
});

export default productsSlice.reducer;
export const { filterProducts } = productsSlice.actions
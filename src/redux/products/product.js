import { createSlice } from '@reduxjs/toolkit';
import { addProduct, getProducts } from '../actions/product';
const initialState = {
  products: [],
  loading: false,
  status: "success",
  error: "none",
  report: null
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
      loading: false,
      products: action.payload,
    }),
    [getProducts.pending]: (state) => ({
      ...state,
      loading: true,
      status: "waiting",
    }),
    [getProducts.rejected]: (state, action) => {
      console.log(action.payload)
      return     {
      ...state,
      error: "No Internet Connection",
      loading: false,
      status: "failed",
    }
   
  },

 
  },
});

export default productsSlice.reducer;
export const { filterProducts } = productsSlice.actions
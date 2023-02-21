import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../actions/product';
// const products;
const initialState = {
  products: [],
  status: "failed",
  error: "none"
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // editProducts: (state, action) => {
    //   const product = state.products.map((prod) => {
    //     if (prod.id === action.payload.id) {
    //       prod = action.payload;
    //     }
    //   });

    //   return {
    //     ...state, products: [...product],
    //   };
    // },

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

// export const { getProducts, editProducts } = productsSlice.actions;
export default productsSlice.reducer;

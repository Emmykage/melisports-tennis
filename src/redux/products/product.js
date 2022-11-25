import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../actions/product';
// const products;
const initialState =  {
  products: [],
  status: false
}


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    editProducts: (state, action) => {
      const product = state.products.map((prod) => {
        if (prod.id === action.payload.id) {
          prod = action.payload;
        }
      });

      return {
        ...state, products: [...product],
      };
    },

  },

  extraReducers:{
    [getProducts.fulfilled]: (state, action) =>({
      ...state,
      status: true,
      products: action.payload
    }),
    [getProducts.pending]: (state) =>({
      ...state,
      status: false
    }),
    [getProducts.rejected]: (state) =>({
      ...state,
      status: false
    })
  }
});

// export const { getProducts, editProducts } = productsSlice.actions;
export default productsSlice.reducer;

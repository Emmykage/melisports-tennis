import { createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../service/cartItems';
import { getCarts, clearCart } from '../actions/cart';

const initialState = {
  cartItems: [],
  message: '',
  counter: 0,
  total: 0,
  status: 'false',
  isLoading: true,
  update: 0,

};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updater: (state) => ({
      ...state,
      update: state.update + 1,
    }),
    calculateTotal: (state) => {
      let total = 0;
      let count = 0;
      if (state.cartItems.length > 0) {
        state.cartItems.forEach((item) => {
          count += item.quantity;
          total += item.quantity * item.product.price;
        });
        return {
          ...state,
          counter: count,
          total,
        };
      }

      return {
        ...state,
        counter: 0,
        total: 0,
      };
    },
  },
  extraReducers: {
    [getCarts.fulfilled]: (state, action) => {
      const cartData = action.payload;
      if (cartData.message) {
        return {
          ...state,
          status: 'success',
          message: cartData.massage,
        };
      }
      return {
        ...state,
        status: 'success',
        cartItems: action.payload,
      };
    },

    [clearCart.fulfilled]: (state) => ({
      ...state,
    }),
    // [addCart.fulfilled]: (action) => {
    // },

  },
});
export const {
  removeItem, increase, updater, calculateTotal, addItem,
} = cartSlice.actions;
export default cartSlice.reducer;

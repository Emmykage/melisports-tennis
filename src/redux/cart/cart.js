import { createSlice } from '@reduxjs/toolkit';

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
    setCartItems: (state, action) => ({
      ...state,
      cartItems: action.payload,
    }),
    getLocalCart: (state, action) => ({
      ...state,
      cartItems: action.payload,
    }),
    updateQty: (state, action) => ({
      ...state,
      cartItems: action.payload,
    }),

    removeItem: (state, action) => ({
      ...state,
      cartItems: action.payload,

    }),

    clearCart: (state, action) => ({
      ...state,
      cartItems: [],
    }),
    calculateTotal: (state, action) => {
      const { count, total } = action.payload;
      return {
        ...state,
        counter: count,
        total,
      };
    },
  },

});
export const {
  removeItem, updateQty, calculateTotal, addItem, addCart, clearCart, setCartItems, getLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;

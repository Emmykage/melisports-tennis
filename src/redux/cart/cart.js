import { createSlice } from '@reduxjs/toolkit';
// import { calculateNewValue } from "@testing-library/user-event/dist/utils";
// import cartItems from '../../service/cartItems';
import { getCarts } from '../actions/cart';

const initialState = {
  cartItems:[],
  counter: 0,
  total: 0,
  status: 'false',
  isLoading: true,
};
// console.log(initialState)
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItem: (state, action) =>{
      // console.log(action.payload)

       return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    

    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      // console.log(itemId);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let total = 0;
      let counter = 0;
      // console.log(amount)
      state.cartItems.forEach((item) => {
        counter += item.amount;
        total += item.amount * item.price;
      
      });
      counter = state.cartItems.length;
      state.counter = counter;
      state.total = total;
      // console.log(counter)
     
    },
  },
  extraReducers: {
    [getCarts.fulfilled]: (state, action) => {
      // console.log("hey")
      return {
      ...state,
      status: "success",
      cartItems: action.payload
    }}
  }
});
// console.log(initialState)
export const {
  clearCart, removeItem, increase, decrease, calculateTotal, addItem
} = cartSlice.actions;
export default cartSlice.reducer;

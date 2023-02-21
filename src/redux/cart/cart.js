import { createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../service/cartItems';
import { getCarts} from '../actions/cart';
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems:[],
  counter: 0,
  total: 0,
  status: 'false',
  isLoading: true,
};
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
      let newQuantity 

      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.quantity += 1;
      newQuantity = cartItem.quantity

       },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let total = 0;
      let count = 0;
      if(state.cartItems.length > 0){
        console.log('more than 0')

        state.cartItems.forEach((item) => {
          count += item.quantity;
          total += item.quantity * item.product.price;
          
        
        });
        return{
          ...state,
          counter: state.cartItems.length,
          total:total
        }
      }else{
        console.log('less than 1')

        return{
          ...state,
          counter: 0,
          total: 0
        }
      }
      
     
    },
  },
  extraReducers: {
    [getCarts.fulfilled]: (state, action) => {
      return {
      ...state,
      status: "success",
      cartItems: action.payload
    }}
  }
});
export const {
  clearCart, removeItem, increase, decrease, calculateTotal, addItem
} = cartSlice.actions;
export default cartSlice.reducer;

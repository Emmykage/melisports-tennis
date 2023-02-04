import { createSlice } from '@reduxjs/toolkit';
// import { calculateNewValue } from "@testing-library/user-event/dist/utils";
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
      let newQuantity 

      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.quantity += 1;
      newQuantity = cartItem.quantity

      const increaseCart = createAsyncThunk('cart/increase_cart', async(id, data)=>{
        const response = await fetch(`${baseURL}cart_items/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(id)
    })
      
      increaseCart(itemId, {quantity: newQuantity })
      // console.log({quantity: newQuantity })
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
      if(state.cartItems > 0){
        state.cartItems.forEach((item) => {
          counter += item.quantity;
          total += item.quantity * item.product.price;
          
        
        });
        return{
          ...state,
          counter: state.cartItems.length,
          total:total
        }
        
      }else{
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

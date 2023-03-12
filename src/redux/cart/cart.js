import { createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../service/cartItems';
import { getCarts, clearCart} from '../actions/cart';
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems:[],
  message: "",
  counter: 0,
  total: 0,
  status: 'false',
  isLoading: true,
  update: 0
  
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updater: (state) => {
      return{
        ...state,
        update: state.update + 1
      }
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
      const cartData = action.payload
      console.log(cartData)
      if(cartData.message){
        return {
          ...state,
          status: "success",
          message: cartData.massage
          // cartItems: action.payload
        }
      }else{
        return {
          ...state,
          status: "success",
          cartItems: action.payload
        }
      }

    },

    [clearCart.fulfilled]: (state) => {
      return {
        ...state,
      }
    }
 
  }
});
export const {
   removeItem, increase, updater, calculateTotal, addItem
} = cartSlice.actions;
export default cartSlice.reducer;

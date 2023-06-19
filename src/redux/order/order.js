import { createSlice } from '@reduxjs/toolkit';
import { addOrder, getOrders } from '../actions/orders';

const initialState = {
  orders: [],
  status: 'pending',
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => {
      return{
      ...state,
      status: "pending"
    }}
  },
  extraReducers: {
    [getOrders.fulfilled]: ( action) => ({
      orders: action.payload,
    }),
    
    [addOrder.fulfilled]: (state, action) => {
      if(action.payload.status == 201){
      return{
      ...state,
      status: 'success',
    }}else{
      return{
        ...state,
        status: 'failed',
      }

    }},
  },
});

export default orderSlice.reducer;
export const {reset} = orderSlice.actions

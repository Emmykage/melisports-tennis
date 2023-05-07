import { createSlice } from '@reduxjs/toolkit';
import { addOrder, getOrders } from '../actions/orders';

const initialState = {
  orders: [],
  status: '',
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => ({
      orders: action.payload,
    }),
    [addOrder.fulfilled]: (state) => ({
      ...state,
      status: 'success',
    }),
  },
});

export default orderSlice.reducer;

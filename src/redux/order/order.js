import { createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrder, getOrders } from '../actions/orders';

const initialState = {
  orders: [],
  status: 'pending',
  loading: false,
  error: false,
  order: {},
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      status: 'pending',
    }),
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => ({
      orders: action.payload,
    }),

    [createOrder.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      error: false,
      order: action.payload.data,

    }),
    [createOrder.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      loading: false,
      error: false,

    }),
    [createOrder.pending]: (state) => ({
      ...state,
      status: 'failed',
      loading: true,

    }),
    [getOrder.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      error: false,
      order: action.payload.data,
    }),
    [getOrder.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,

    }),
    [getOrder.pending]: (state) => ({
      ...state,
      loading: true,
    }),
  },
});

export default orderSlice.reducer;
export const { reset } = orderSlice.actions;

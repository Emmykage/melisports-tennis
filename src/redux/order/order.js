import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder, deleteOrder, getOrder, getOrders, updateOrder,
} from '../actions/orders';

const initialState = {
  orders: [],
  status: 'pending',
  loading: false,
  error: false,
  order: {},
  message: null,
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => ({
      ...state,
      status: 'pending',
      message: null,
      error: null,
      loading: false,
    }),
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => ({
      orders: action.payload.data,
      loading: false,
    }),
    [getOrders.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),

    [getOrders.rejected]: (state, action) => ({
      ...state,
      loading: false,
      message: action.payload?.message,
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
    [updateOrder.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      error: false,
      order: action.payload.data,

    }),
    [updateOrder.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      loading: false,
      error: false,

    }),
    [updateOrder.pending]: (state) => ({
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

    [deleteOrder.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [deleteOrder.rejected]: (state, action) => ({
      ...state,
      loading: false,

    }),
    [deleteOrder.pending]: (state, action) => ({
      ...state,
      loading: true,

    }),
  },
});

export default orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;

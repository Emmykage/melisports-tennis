import { createSlice } from '@reduxjs/toolkit';
import {
  createInvoice,
  createOrder, deleteOrder, getInvoice, getOrder, getOrders, updateOrder,
} from '../actions/orders';

const initialState = {
  invoices: [],
  status: 'pending',
  loading: false,
  error: false,
  invoice: {},
  message: null,
};
const invoiceSlice = createSlice({
  name: 'invoices',
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
    [createInvoice.fulfilled]: (state, action) => ({
      ...state,
      invoice: action.payload.data,
      loading: false,
    }),
    [createInvoice.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),

    [createInvoice.rejected]: (state, action) => ({
      ...state,
      loading: false,
      message: action.payload?.message,
    }),
    [getInvoice.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),

    [getInvoice.rejected]: (state, action) => ({
      ...state,
      loading: false,
      message: action.payload?.message || 'faild to fetch invoice',
    }),
    [getInvoice.fulfilled]: (state, action) => ({
      ...state,
      invoice: action.payload.data,
      loading: false,
    }),

  },
});

export default invoiceSlice.reducer;

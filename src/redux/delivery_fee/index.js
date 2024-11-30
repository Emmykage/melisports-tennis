import { createSlice } from '@reduxjs/toolkit';
import { addDeliveryFee, deleteDeliveryFee, getDeliveryFee, getDeliveryFees, updateDeliveryFee } from '../actions/delivery_fee';


const initialState = {
  deliverFees: [],
  status: 'pending',
  loading: false,
  error: false,
  deliverFee: {},
  message: null,
};
const deliveryFeeSlice = createSlice({
  name: 'delivery_fee',
  initialState,
  reducers: {
    resetDeliveryFee: (state) => ({
      ...state,
      status: 'pending',
      message: null,
      error: null,
      loading: false,
    }),
  },
  extraReducers: {
    [getDeliveryFees.fulfilled]: (state, action) => ({
      ...state,
      DeliveryFees: action.payload.data,
      loading: false,
    }),
    [getDeliveryFees.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),

    [getDeliveryFees.rejected]: (state, action) => ({
      ...state,
      loading: false,
      message: action.payload?.message,
    }),

    [addDeliveryFee.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      error: false,
      deliveryFee: action.payload.data,

    }),
    [addDeliveryFee.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      loading: false,
      error: false,

    }),
    [addDeliveryFee.pending]: (state) => ({
      ...state,
      status: 'failed',
      loading: true,

    }),
    [updateDeliveryFee.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      error: false,
      deliveryFee: action.payload.data,

    }),
    [updateDeliveryFee.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      loading: false,
      error: false,

    }),
    [updateDeliveryFee.pending]: (state) => ({
      ...state,
      status: 'failed',
      loading: true,

    }),
    [getDeliveryFee.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      error: false,
      deliveryFee: action.payload.data,
    }),
    [getDeliveryFee.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,

    }),
    [getDeliveryFee.pending]: (state) => ({
      ...state,
      loading: true,
    }),

    [deleteDeliveryFee.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [deleteDeliveryFee.rejected]: (state, action) => ({
      ...state,
      loading: false,

    }),
    [deleteDeliveryFee.pending]: (state, action) => ({
      ...state,
      loading: true,

    }),
  },
});


export const delverStateFee = "hey"

export default deliveryFeeSlice.reducer;
export const { resetDeliveryFee } = deliveryFeeSlice.actions;

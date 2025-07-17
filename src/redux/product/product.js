import { createSlice } from '@reduxjs/toolkit';
import {
  addProduct, deleteProduct, getProduct, updateProduct,
} from '../actions/product';
import searched from '../actions/search';

const initialState = {
  product: {},
  status: null,
  loading: true,
  message: null,
  updater: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => ({
      ...state,
      render: false,
      product: action.payload,
      loading: false,
    }),
    [getProduct.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [getProduct.rejected]: (state) => ({
      ...state,
      loading: false,
      pending: false,
    }),
    [addProduct.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      error: false,
      status: 'success',
      message: action.payload.message,
    }),
    [addProduct.rejected]: (state, action) => ({
      ...state,
      loading: false,
      status: 'rejected',
      message: action.payload.message,
    }),
    [addProduct.pending]: (state) => ({
      ...state,
      loading: true,
      status: 'waiting',
      message: 'loading...',
    }),
    [updateProduct.fulfilled]: (state, action) => ({
      ...state,
      product: action.payload.data,
      pending: false,
      status: 'success',
      message: 'product has been updated',
    }),
    [updateProduct.pending]: (state) => ({
      ...state,
      status: 'waiting',
      pending: true,
      message: 'loading...',
    }),
    [updateProduct.rejected]: (state, action) => ({
      ...state,
      status: 'rejected',
      pending: false,
      message: action.payload.message,
    }),
    [deleteProduct.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      message: 'deleted',
      updater: !state.updater,

    }),

  },
  reducers: {

    writeProduct: (state, action) => {
      if (action.payload.name == 'cloth_sizes_attributes' || action.payload.name == 'shoe_sizes_attributes') {
        const { options } = action.payload;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push({ abbrv: options[i].value });
          }
        }

        return {
          ...state,
          product: {
            ...state.product,
            [action.payload.name]: value,
          },
        };
      }
      return {
        ...state,
        product: {
          ...state.product,
          [action.payload.name]: action.payload.value,
        },
      };
    },

    resetProduct: (state) => ({
      ...state,
      loading: false,
      status: null,
      error: false,
      counter: 0,
      message: null,
    }),
  },
});

export default productSlice.reducer;
export const { writeProduct, resetProduct } = productSlice.actions;

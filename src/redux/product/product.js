import { createSlice } from '@reduxjs/toolkit';
import {
  addProduct, deleteProduct, getProduct, updateProduct,
} from '../actions/product';
import searched from '../actions/search';

const initialState = {
  product: {},
  status: null,
  loading: true,
  report: null,
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
      report: 'product has been added',
    }),
    [addProduct.rejected]: (state, action) => ({
      ...state,
      loading: false,
      status: 'rejected',
      report: action.payload.message,
    }),
    [addProduct.pending]: (state) => ({
      ...state,
      loading: true,
      status: 'waiting',
      report: 'loading...',
    }),
    [updateProduct.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      status: 'success',
      report: 'product has been updated',
    }),
    [updateProduct.pending]: (state) => ({
      ...state,
      status: 'waiting',
      loading: true,
      report: 'loading...',
    }),
    [updateProduct.rejected]: (state, action) => ({
      ...state,
      status: 'rejected',
      loading: false,
      report: action.payload.message,
    }),
    [deleteProduct.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      report: 'deleted',
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
      report: null,
    }),
  },
});

export default productSlice.reducer;
export const { writeProduct, resetProduct } = productSlice.actions;

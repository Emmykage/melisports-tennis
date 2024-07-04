import { createSlice } from '@reduxjs/toolkit';
import {
  addProductCategory, deleteCategory, getProductCategories, updateCategory,
} from '../actions/product_category';

const initialState = {
  product_categories: [],
  loading: true,
  status: null,
  report: null,
  updater: false,
};
const productCategorySlice = createSlice({
  name: 'product_category',
  initialState,
  extraReducers: {
    [getProductCategories.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      status: 'success',
      product_categories: action.payload,
    }),
    [getProductCategories.pending]: (state) => ({
      ...state,
      status: 'waiting',
      report: 'waiting',
      loading: true,
    }),
    [getProductCategories.rejected]: (state, action) => ({
      ...state,
      status: 'rejected',
      report: 'casted',
      loading: false,
    }),
    [addProductCategory.fulfilled]: (state) => ({
      ...state,
      status: 'success',
      loading: false,
      report: 'categgory has been added',
    }),
    [addProductCategory.rejected]: (state, action) => ({
      ...state,
      status: 'rejected',
      loading: false,
      report: action.payload.message,
    }),
    [addProductCategory.pending]: (state) => ({
      ...state,
      status: 'waiting',
      loading: true,
      report: 'loading...',
    }),
    [updateCategory.fulfilled]: (state) => ({
      ...state,
      loading: false,
      status: 'success',
      report: 'update successful',
      updater: !state.updater,

    }),
    [updateCategory.pending]: (state) => ({
      ...state,
      loading: true,
      status: 'waiting',
      report: 'loading...',
    }),
    [updateCategory.rejected]: (state) => ({
      ...state,
      loading: false,
      status: 'rejected',
      report: 'failed to update product',
    }),
    [deleteCategory.fulfilled]: (state) => ({
      ...state,
      loading: false,
      updater: !state.updater,
    }),

  },
  reducers: {

    resetCategory: (state) => ({
      ...state,
      loading: false,
      status: null,
      error: false,
      report: null,
    }),
  },
});

export default productCategorySlice.reducer;
export const { resetCategory } = productCategorySlice.actions;

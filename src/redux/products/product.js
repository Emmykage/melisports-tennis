import { createAction, createSlice } from '@reduxjs/toolkit';
import { act } from 'react';
import {
  getLetestProducts, getProducts, getSimilarProducts, searchedProducts,
} from '../actions/product';

const initialState = {
  products: [],
  searched_products: [],
  padelRacquets: [],
  badmintonRacquets: [],
  filteredProducts: [],
  latestArrival: [],
  loading: true,
  status: null,
  error: false,
  counter: 0,
  report: null,
  message: null,
  sortedProducts: [],
  relatedProducts: [],
  relatedError: false,
  searchLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      products: action.payload.data,
      error: false,
    }),

    [getProducts.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [getProducts.rejected]: (state, action) => ({
      ...state,
      error: true,
      loading: false,
      message: 'Somethin went wrong',
    }),
    [getLetestProducts.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      latestArrival: action.payload.data,
      error: false,
    }),
    [getLetestProducts.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: true,
      message: action.payload.message,
    }),
    [getLetestProducts.pending]: (state, action) => ({
      ...state,
      loading: true,

    }),
    [getSimilarProducts.fulfilled]: (state, action) => ({
      ...state,
      relatedProducts: action.payload.data,
      loading: false,
      relatedError: false,

    }),
    [getSimilarProducts.pending]: (state) => ({
      ...state,
      loading: true,
      relatedError: false,

    }),
    [getSimilarProducts.rejected]: (state, action) => ({
      ...state,
      relatedError: true,
      loading: false,
      message: action.payload.message,
      relatedProducts: [],

    }),

    [searchedProducts.fulfilled]: (state, action) => ({
      ...state,
      searchLoading: false,
      searched_products: action.payload.data,

    }),
    [searchedProducts.rejected]: (state, action) => ({
      ...state,
      searchLoading: false,
      message: action.payload.message ?? 'Failed to search produtc',

    }),

    [searchedProducts.pending]: (state) => ({
      ...state,
      searchLoading: true,

    }),

  },
  reducers: {

    clearSearch: (state) => ({
      ...state,
      searched_products: [],
    }),
    searchedPage: (state, action) => {
      const f_product = action.payload.length < 1 ? [] : state.products.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()));
      return {
        ...state,
        search_product_page: f_product,
      };
    },

    resetProduct: (state) => ({
      ...state,
      sortedProducts: state.products,
    }),

  },
});

// const clearSearchField = createAction()
export default productsSlice.reducer;
export const {
  filterPlayerType, clearSearch, searchedPage, resetProduct,
} = productsSlice.actions;

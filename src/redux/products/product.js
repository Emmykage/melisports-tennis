import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';
import { getLetestProducts, getProducts, getSimilarProducts } from '../actions/product';

const initialState = {
  products: [],
  searched_products: [],
  search_product_page: [],
  padelRacquets: [],
  badmintonRacquets: [],
  filteredProducts: [],
  latestArrival: [],
  loading: false,
  status: null,
  error: false,
  counter: 0,
  report: null,
  message: null,
  sortedProducts: [],
  relatedProducts: [],
  relatedError: false,
  name: 'morris',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      const products_badminton = action.payload.data.filter((badminton) => badminton.sport_category?.name === 'Badminton');
      const products_padel = action.payload.data.filter((padel) => padel.sport_category?.name === 'Padel');
      const sortedLatest = action.payload.data.filter((item) => item.new_product);

      return {
        ...state,
        status: 'success',
        loading: false,
        products: action.payload.data,
        padelRacquets: products_padel,
        latestArrival: sortedLatest,
        error: false,
        badmintonRacquets: products_badminton,
      };
    },

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
      latestArrival: action.payload,
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

  },
  reducers: {
    searchedProducts: (state, action) => {
      const f_product = action.payload.length < 1 ? [] : state.products.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()));
      return {
        ...state,
        searched_products: f_product,
      };
    },
    searchedPage: (state, action) => {
      const f_product = action.payload.length < 1 ? [] : state.products.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase()));
      return {
        ...state,
        search_product_page: f_product,
      };
    },
    filterCapacity: (state, action) => {
      const filterRaw = state.products.filter((item) => action.payload.some((element) => item.description?.includes(element) || item.description_body?.includes(element)));
      console.log('payload filter processed: ', filterRaw);

      return {
        ...state,
        products: filterRaw,
      };
    },

    filterSports: (state, action) => {
      const filterSports = state.products.filter((item) => action.payload.some((sport) => item.sport_category?.name.toLowerCase() === sport));
      return {
        ...state,
        products: filterSports,

      };
    },
    filterActivities: (state, action) => {
      const filts = state.products.filter((item) => action.payload.some((level) => item.level?.stage.toLowerCase() === level));

      return {
        ...state,
        products: filts,
      };
    },
    filterLevels: (state, action) => {
      // console.log(action.payload);
      const filts = state.products.filter((item) => action.payload.some((level) => item.level?.stage.toLowerCase() === level));

      return {
        ...state,
        products: filts,
      };
    },
    filterPlayerType: (state, action) => {
      console.log(action.payload);
      const filts = state.products.filter((item) => action.payload.some((level) => item.player_type?.toLowerCase() === level));
      console.log(filts);

      return {
        ...state,
        padelRacquets: filts,

      };
    },
    filterFeatures: (state, action) => {
      const filts = state.products.filter((item) => action.payload.some((feature) => item?.description.toLowerCase().includes(feature)));
      return {
        ...state,
        products: filts,
      };
    },

    getLatest: (state) => {
      const sortedProducts = [...state.products].filter((item) => item.new_product);
      return {
        ...state,
        latestArrival: sortedProducts,
        loading: false,

      };
    },
    resetProduct: (state) => ({
      ...state,
      sortedProducts: state.products,
    }),

  },
});

export default productsSlice.reducer;
export const {
  filterPlayerType, filterProducts, searchedProducts, filterCapacity, filterLevels, getLatest, filterSports, searchedPage, filterActivities, filterFeatures, filterGenders, resetProduct,
} = productsSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { getLetestProducts, getProducts } from '../actions/product';

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
  sortedProducts: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      const products_badminton = action.payload.data.filter((badminton) => badminton.sport_category?.name == 'Badminton');
      const products_padel = action.payload.data.filter((padel) => padel.sport_category?.name == 'Padel');
      const sortedLatest  = action.payload.data.filter((item) => item.new_product);

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
    [getLetestProducts.fulfilled]: (state, action) => {


      return{
        ...state,
        loading: false,
        latestArrival: action.payload,
        error: false
      }
    },
    [getLetestProducts.rejected]: (state, action) => {
      return{
        ...state,
        loading: false,
        error: true,
        message: action.payload.message
      }
    }
    ,
    [getLetestProducts.pending]: (state, action) => {
      return{
        ...state,
        loading: true,

      }
    }

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
    filterProducts: (state, action) => {
      const char = action.payload.toLowerCase()
      const sortedProduct = state.products.filter((item) => item.name.toLowerCase().includes(char))
      return{
      ...state,
      filteredProducts: sortedProduct,
      sortedProducts: sortedProduct
      
      

    }},

    filterActivities: (state, action) => {
      const filts = state.products.filter((item) => item.level?.stage.toLowerCase().includes(action.payload));
      return {
        ...state,
        products: filts,
      };
    },
    filterFeatures: (state, action) => {
      const filts = state.products.filter((item) => item?.description.toLowerCase().includes(action.payload));
      return {
        ...state,
        products: filts,
      };
    },
    filterGender: (state, action) => {
      const filts = state.products.filter((item) => item?.gender?.name.toLowerCase().includes(action.payload));
      return {
        ...state,
        products: filts,
      };
    },
    getLatest: (state) => {

      const sortedProducts  = [...state.products].filter((item) => item.new_product);
      return {
        ...state,
        latestArrival: sortedProducts,
        loading: false

      };
    },
    resetProduct: (state) => ({
      ...state,
      sortedProducts: state.products
    })

  },
});

export default productsSlice.reducer;
export const {
  filterProducts, searchedProducts, getLatest, searchedPage, filterActivities, filterFeatures, filterGender, resetProduct
} = productsSlice.actions;

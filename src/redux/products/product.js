import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../actions/product';

const initialState = {
  products: [],
  searched_products: [],
  filteredProducts: [],
  loading: false,
  status: null,
  error: false,
  counter: 0,
  report: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      loading: false,
      products: action.payload,
    }),

    [getProducts.pending]: (state) => ({
      ...state,
      loading: true,
      status: 'waiting',
    }),
    [getProducts.rejected]: (state) => ({
      ...state,
      error: 'No Internet Connection',
      loading: false,
      status: 'failed',
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
    filterProducts: (state, action) => ({
      ...state,
      products: state.products.filter((item) => item.name.toLowerCase().includes(action.payload)),
    }),

    filterActivities: (state, action) => {
      console.log(action.payload);

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

  },
});

export default productsSlice.reducer;
export const {
  filterProducts, searchedProducts, filterActivities, filterFeatures, filterGender
} = productsSlice.actions;

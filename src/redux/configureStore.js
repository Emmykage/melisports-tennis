import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import categoryReducer from "./category/categories";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categoryReducer from './category/categories';
import productReducer from './products/product';
import cartReducer from './cart/cart';
import productSlice from "./product/product"
import modalSlice from './modal/modal';
import categogryModal from './modal/categoryModal';

const rootReducer = combineReducers({
  cart: cartReducer,
  modal: modalSlice,
  categories: categoryReducer,
  products: productReducer,
  product: productSlice,
  product_categories: categogryModal

});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk, logger));

export default store;

import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import categoryReducer from "./category/categories";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categoryReducer from './category/categories';
import productReducer from './products/product';
import cartReducer from './cart/cart'

const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoryReducer,
  products: productReducer,

});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk, logger));

export default store;

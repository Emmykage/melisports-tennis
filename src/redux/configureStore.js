import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
// import categoryReducer from "./category/categories";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categoryReducer from './category/categories';
import productReducer from './products/product';
import cartReducer from './cart/cart';
import productSlice from './product/product';
import modalSlice from './modal/modal';
import categogryModal from './modal/categoryModal';
import delProductSlice from './modal/delModal';
import productCategory from './product_category/productCategory';
import delCatSlice from './modal/catDelModal';
import userSlice from './user/user';
import usersSlice from './users/user';
import searchSlice from './products/searched';
import navSlice from './modal/nav';
import levelSlice from './level/level';
import genderSlice from './gender/gender';
import orderSlice from './order/order';
import catalogSlice from './catalog/catalog';
import appSlice from './app/app';

const rootReducer = combineReducers({
  cart: cartReducer,
  modal: modalSlice,
  categories: categoryReducer,
  products: productReducer,
  product: productSlice,
  modal_categories: categogryModal,
  delModal: delProductSlice,
  product_categories: productCategory,
  user: userSlice,
  users: usersSlice,
  cat_del_modal: delCatSlice,
  searched_products: searchSlice,
  navToggle: navSlice,
  level: levelSlice,
  gender: genderSlice,
  orders: orderSlice,
  app: appSlice,
  catalog: catalogSlice,

});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk, logger));

export default store;

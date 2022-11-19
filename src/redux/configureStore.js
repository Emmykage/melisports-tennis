import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./category/categories";
import categoryReducer from "./category/categories";
import productsSlice  from "./category/products/product";
// import { combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productsSlice
    }
})
export default store
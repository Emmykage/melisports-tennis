import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./category/categories";
import categoryReducer from "./category/categories";
import productsSlice  from "./products/product";
import { applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    
        categories: categoryReducer,
        products: productsSlice
    
})

const store = configureStore({ reducer: rootReducer}, applyMiddleware(thunk, logger))

export default store
import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/product";

const initialState = {
    product: {},
    status: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProduct.fulfilled]: (state, action) =>({
            ...state,
            product: action.payload
        })
    }
})

export default productSlice.reducer

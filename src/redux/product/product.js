import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../actions/product";

const initialState = {
    product: {},
    status: false,
    loading: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProduct.fulfilled]: (state, action) =>({
            ...state,
            product: action.payload
        }),
        [getProduct.pending]: (state, action) =>({
            ...state,
            loading: true
        }),
        [getProduct.rejected]: (state, action) =>({
            ...state,
            loading: false
        })
    }
})

export default productSlice.reducer

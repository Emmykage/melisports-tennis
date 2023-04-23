import { createSlice } from "@reduxjs/toolkit";
import { addProduct, getProduct, updateProduct } from "../actions/product";

const initialState = {
    product: {},
    status: false,
    loading: false,
    report: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [getProduct.fulfilled]: (state, action) =>({
            ...state,
            loading: false,
            product: action.payload
        }),
        [getProduct.pending]: (state, action) =>({
            ...state,
            loading: true
        }),
        [getProduct.rejected]: (state, action) =>({
            ...state,
            // loading: false
        }),
        [addProduct.fulfilled]: (state) => ({
            ...state,
            report: "product has been added"
          }),
          [updateProduct.fulfilled]: (state) => ({
            ...state,
            report: "product has been added"
          })
    }
})

export default productSlice.reducer

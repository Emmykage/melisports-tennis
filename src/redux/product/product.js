import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../actions/product";

const initialState = {
    product: {},
    status: "false",
    loading: false,
    report: null,
    updater: false
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
            loading: false,
            status: "success",
            report: "product has been added"
          }),
          [addProduct.rejected]: (state) => ({
            ...state,
            loading: false,
            status: "rejected",
            report: "product can't be added"
          }),
          [addProduct.pending]: (state) => ({
            ...state,
            loading: true,
            status: "waiting",
            report: "loading..."
          }),
          [updateProduct.fulfilled]: (state) => {
            return {
            ...state,
            loading: false,
            status: "success",
            report: "product has been updated"
          }},
          [updateProduct.pending]: (state) => {
            return {
            ...state,
            status: "waiting",
            loading: true,
            report: "loading..."
          }},
          [updateProduct.rejected]: (state, action) => {
            return {
            ...state,
            status: "rejected",
            loading: false,
            report: "failed to update"
          }},
          [deleteProduct.fulfilled]: (state) => {
            return{
            ...state,
            status: "success",
            loading: false,
            report: "deleted",
            updater: !state.updater

            }}
    }
})

export default productSlice.reducer

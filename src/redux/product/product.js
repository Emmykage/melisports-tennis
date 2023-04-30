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
        [getProduct.pending]: (state) =>({
            ...state,
            loading: true
        }),
        [getProduct.rejected]: (state) =>({
            ...state,
        }),
        [addProduct.fulfilled]: (state, action) => {
          if(action.payload.ok){
            return{
              ...state,
              loading: false,
              status: "success",
              report: "product has been added"
            }

          }else{
            return{
              ...state,
              loading: false,
              status: "rejected",
              report: "failed to created product"
            }
          }
        },
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
            if(action.payload.ok){
            return {
            ...state,
            loading: false,
            status: "success",
            report: "product has been updated"
          }}else{
            return {
              ...state,
              loading: false,
              status: "rejected",
              report: "failed to update"
            }
          }},
          [updateProduct.pending]: (state) => {
            return {
            ...state,
            status: "waiting",
            loading: true,
            report: "loading..."
          }},
          [updateProduct.rejected]: (state) => {
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

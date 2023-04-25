import { addProductCategory, deleteCategory, getProductCategories, updateCategory } from "../actions/product_category";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product_categories: [],
    status: "failed",
    loading: false,
    report: null,
    updater: true
}
const productCategorySlice = createSlice({
    name: "product_category",
    initialState,
    extraReducers: {
        [getProductCategories.fulfilled]: (state, action) => ({
            ...state,
            loading: false,
            status: "success",
            product_categories: action.payload
        }),
        [getProductCategories.pending]: (state)=>({
            ...state,
            status: "waiting",
            report: "waiting",
            loading: true
        }),
        [getProductCategories.rejected]: (state) =>({
            ...state,
            status: "rejected",
            report: "waiting",
            loading: true
        }),
        [addProductCategory.fulfilled]: (state) => {
            return{
                ...state,
                status: "success",
                loading: false,
                report: "categgory has been added",
            }
        },
        [addProductCategory.rejected]: (state) => {
            return{
                ...state,
                status: "rejected",
                loading: false,
                report: "categgory has been added",
            }
        },
        [addProductCategory.pending]: (state) => {
            return{
                ...state,
                status: "waiting",
                loading: true,
                report: "loading...",
            }
        },
        [updateCategory.fulfilled]: (state, action) => {
            console.log("this was a success")
            return{
                ...state,
                loading: false,
                status: "success",
                report: "update successful",
                updater: !state.updater

            }
        },
        [updateCategory.pending]: (state) => {
            return{
                ...state,
                loading: true,
                status: "waiting",
                report: "loading..."
            }
        },
        [updateCategory.rejected]: (state) => {
            return{
                ...state,
                loading: false,
                status: "rejected",
                report: "failed to update product"
            }
        },
        [deleteCategory.fulfilled]: (state) =>{
            return{
                ...state,
                loading: false,
                updater: !state.updater
            }
        },

        

    }
})

export default productCategorySlice.reducer
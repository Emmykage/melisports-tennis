import { getProductCategories } from "../actions/product_category";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product_categories: [],
    status: "failed",
    error: ""
}
const productCategorySlice = createSlice({
    name: "product_category",
    initialState,
    extraReducers: {
        [getProductCategories.fulfilled]: (state, action) => ({
            ...state,
            product_categories: action.payload
        }),
        [getProductCategories.pending]: (state, action)=>({
            ...state,
            status: "loading"
        }),
        [getProductCategories.rejected]: (state, action) =>({
            ...state,
            status: "failed",
            error: action.error
        })

    }
})

export default productCategorySlice.reducer
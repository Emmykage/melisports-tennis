import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3000/api/v1/"

const addProductCategory = createAsyncThunk('product_category/add_product_category', async(data) => {
    await fetch(`${baseURL}product_categories`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

})
export {addProductCategory}
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
const getProductCategories = createAsyncThunk('product_category/get_product_category', async(data) => {
    const response = await fetch(`${baseURL}product_categories`).then((res) => res.json())
    // console.log(response)
return response
})
export {addProductCategory, getProductCategories}
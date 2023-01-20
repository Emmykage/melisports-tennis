import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3000/api/v1/"
const addCart = createAsyncThunk('cart/addCart', async(data)=>{
    const response = await fetch(`${baseURL}cart_items`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response
})
const getCarts = createAsyncThunk('carts/getCart', async()=>{
    const response = await fetch(`${baseURL}cart_items`).then((res) => res.json())
    console.log(response)
    return response
})
export {addCart, getCarts}
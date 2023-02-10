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
const removeItem = createAsyncThunk('cart/removeCart', async(id)=>{
    console.log(id)
    const response = await fetch(`${baseURL}cart_items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
       
    })
    console.log("deleted")
    return response
})
const getCarts = createAsyncThunk('carts/getCart', async()=>{
    const response = await fetch(`${baseURL}cart_items`).then((res) => res.json())
    return response
})
const increaseCart = createAsyncThunk('cart/increase_cart', async({id, quantity})=>{
     await fetch(`${baseURL}cart_items/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({quantity: quantity})
    })
    console.log(quantity)
})
const decreaseCart = createAsyncThunk('cart/increase_cart', async({id, quantity})=>{
    await fetch(`${baseURL}cart_items/${id}`,{
       method: 'PATCH',
       headers: {
           'Content-type': 'application/json'
       },
       body: JSON.stringify({quantity: quantity})
   })
   console.log(quantity)
})
export {addCart, getCarts, removeItem, increaseCart, decreaseCart}
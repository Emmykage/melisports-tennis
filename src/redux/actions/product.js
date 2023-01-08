import { createAsyncThunk } from '@reduxjs/toolkit';
const baseURL = "http://localhost:3000/api/v1/"
const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products').then((res) => res.json())
  // .catch((err) => console.log(err));
  return response;
});



const getProduct = createAsyncThunk("product/getproduct", async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json()).catch((err) => console.log(err) )
  return response;
})
 const addProduct = createAsyncThunk("product/addproduct", async (data) => {
   await fetch(`${baseURL}products`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
   })
 })


export { getProducts, getProduct, addProduct };
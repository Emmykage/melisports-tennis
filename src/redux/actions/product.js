import { createAsyncThunk } from '@reduxjs/toolkit';
const baseURL = "http://localhost:3000/api/v1/"
const demoBaseURL = 'https://fakestoreapi.com/products/'
const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch(`${baseURL}products`).then((res) => res.json())
  // .catch((err) => console.log(err));
  return response;
});



const getProduct = createAsyncThunk("product/getproduct", async (id) => {
  const response = await fetch(`${baseURL}products/${id}`).then((res) => res.json()).catch((err) => console.log(err) )
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


 const deleteProduct = createAsyncThunk("product/deleteproduct", async(id) =>{
  await fetch(`${baseURL}products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json"
    }
  }).then((res) => res.json())
 })


export { getProducts, getProduct, addProduct, deleteProduct };
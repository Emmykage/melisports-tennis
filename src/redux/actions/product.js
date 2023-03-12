import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from "../baseURL";




const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch(`${baseURL}products`).then((res) => res.json())
  // .catch((err) => console.log(err));
  return response;
});



const getProduct = createAsyncThunk("product/getproduct", async (id) => {
  const response = await fetch(`${baseURL}products/${id}`).then((res) => res.json()).catch((err) => console.log(err) )
  return response;
})

const updateProduct = createAsyncThunk("updateProduct", async(id)=>{
  const response = await fetch(`${baseURL}products/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
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


export { getProducts, getProduct, addProduct, deleteProduct, updateProduct };
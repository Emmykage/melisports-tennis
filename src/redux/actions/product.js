import { createAsyncThunk } from '@reduxjs/toolkit';

const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products').then((res) => res.json()).catch((err) => console.log(err));
  return response;
});



const getProduct = createAsyncThunk("product/getproduct", async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json()).catch((err) => console.log(err) )
  return response;
})

export { getProducts, getProduct };
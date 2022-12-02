import { createAsyncThunk } from '@reduxjs/toolkit';

const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products').then((res) => res.json()).catch((err) => console.log(err));
  return response;
});

export { getProducts };

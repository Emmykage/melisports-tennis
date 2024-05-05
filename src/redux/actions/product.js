import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;


const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch(`${baseURL}products`).then((res) => res.json());
  return response;
});

const filterProducts = createAsyncThunk('products/getProducts', async (sieve) => {
  const response = await fetch(`${baseURL}products`).then((res) => res.json());
  const filtered = response.filter((item) => item.name.toLowerCase().includes(sieve));
  return filtered;
});

const getProduct = createAsyncThunk('product/getproduct', async (id) => {
  const response = await fetch(`${baseURL}products/${id}`).then((res) => res.json());
  return response;
});

const updateProduct = createAsyncThunk('updateProduct', async ({editId, formData}) => {
    const response = await fetch(`${baseURL}products/${editId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token()}`
    },
    body: formData
  });

  return response;
});

const addProduct = createAsyncThunk('product/addproduct', async (data) => {
  const response = await fetch(`${baseURL}products`, {
    method: 'POST',
    headers: {

      Authorization: `Bearer ${token()}`
    },
    body: data
  });
  return response;
});

const deleteProduct = createAsyncThunk('product/deleteproduct', async (id) => {
  await fetch(`${baseURL}products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then(res => res.text());
});

export {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct, 
};

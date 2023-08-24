import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;

// const addCart = createAsyncThunk('cart/addCart', async (data) => {
//   const response = await fetch(`${baseURL}cart_items`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token()}`,

//     },
//     body: JSON.stringify(data),
//   });
//   return response;
// });
const removeItem = createAsyncThunk('cart/removeCart', async (id) => {
  const response = await fetch(`${baseURL}cart_items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,

    },

  });
  return response;
});
// const clearCart = createAsyncThunk('cart/clearCart', async () => {
//   const response = await fetch(`${baseURL}clear_cart`, {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token()}`,

//     },

//   });
//   return response;
// });
const getCarts = createAsyncThunk('carts/getCart', async () => {
  const response = await fetch(`${baseURL}cart_items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  }).then((res) => res.json());
  return response;
});
const increaseCart = createAsyncThunk('cart/increase_cart', async ({ id, quantity }) => {
  await fetch(`${baseURL}cart_items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,

    },
    body: JSON.stringify({ quantity }),
  });
});
const decreaseCart = createAsyncThunk('cart/increase_cart', async ({ id, quantity }) => {
  await fetch(`${baseURL}cart_items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,

    },
    body: JSON.stringify({ quantity }),
  });
});
export {
   getCarts, removeItem, increaseCart, decreaseCart
};

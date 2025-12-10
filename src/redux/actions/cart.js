import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import cartSlice, { setCartItems } from '../cart/cart';
// import {setCartItems}  from "../cart/cart"
import { getCart, setCart } from '../../hooks/localStorage';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;

export const addToCart = (newCartArray) => (dispatch, getState) => {
  const existingCarts = getCart() || [];

  if (!existingCarts || existingCarts.length < 1) {
    setCart(newCartArray);
    return newCartArray;
  }

  newCartArray.forEach((newCart) => {
    const cartIndex = existingCarts.findIndex((cart) => cart?.product_id === newCart.product_id);
    const cartExist = cartIndex !== -1;

    if (cartExist) {
      existingCarts[cartIndex] = newCart;
    } else {
      existingCarts.push(newCart);
    }
  });

  setCart(existingCarts);

  dispatch(setCartItems(existingCarts));
};
// const removeItem = createAsyncThunk('cart/removeCart', async (id) => {
//   const response = await fetch(`${baseURL}cart_items/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token()}`,

//     },

//   });
//   return response;
// });
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
  getCarts, increaseCart, decreaseCart,
};

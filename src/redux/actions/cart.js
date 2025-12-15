import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import baseURL from '../baseURL';
import {
  calculateTotal, clearCart, getLocalCart, removeItem, setCartItems, updateQty,
} from '../cart/cart';
import { getCart, setCart } from '../../hooks/localStorage';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;
const refCart = () => getCart().map((cart) => ({
  product_id: cart.product_id,
  id: cart.id,
  price: cart.price,
  ...(cart?.discount_amount && { discount: cart?.discount_amount }),
  product_name: cart.product_name,
  image: cart.image,
  size: cart.size,
  colours: cart.colours,
  quantity: cart.quantity,
  subTotal: cart.quantity * cart.price,
}));
export const addToCart = (newCartArray) => (dispatch, getState) => {
  const existingCarts = getCart() || [];

  let updateExistingCart = [...existingCarts];
  if (!newCartArray || newCartArray?.length < 1) {
    console.log(newCartArray);

    toast('No item added to cart', { type: 'info' });
    return;
  }

  if (!existingCarts || existingCarts.length < 1) {
    updateExistingCart = newCartArray;
  }

  console.log('first');

  newCartArray.forEach((newCart) => {
    const cartIndex = updateExistingCart.findIndex((cart) => cart?.id === newCart.id);
    const cartExist = cartIndex !== -1;

    if (cartExist) {
      updateExistingCart = updateExistingCart.map((cart, index) => (cartIndex == index ? newCart : cart));
    } else {
      updateExistingCart = [...updateExistingCart, newCart];
    }
  });

  console.log('added cart ==================>');

  setCart(updateExistingCart);
  dispatch(getCartSum());
  dispatch(setCartItems(updateExistingCart));
};

export const updateQuantity = (data) => (dispatch, getState) => {
  const updateCart = getCart().map((item) => {
    if (item.id === data.id) {
      item.quantity = data.quantity;
    }
    return item;
  });
  setCart(updateCart);
  dispatch(updateQty(updateCart));
};

export const deleteCartItem = (id) => (dispatch, getState) => {
  const filterdCart = getCart().filter((cart) => cart.id !== id);
  setCart(filterdCart);

  dispatch(removeItem(filterdCart));
};

export const emptyCart = () => (dispatch, getState) => {
  const updateCart = [];
  setCart(updateCart);

  dispatch(clearCart(updateCart));
};

export const getCartSum = () => (dispatch, getState) => {
  let total = 0;
  let count = 0;
  const trans = getCart() || [];

  if (trans.length > 0) {
    trans.forEach((item) => {
      count += item.quantity;
      total += item.quantity * item.price;
    });
  }

  dispatch(calculateTotal({ count, total }));
};

export const getUserCart = () => (dispatch) => {
  const carts = refCart();

  dispatch(getLocalCart(carts));
};

export const getCarts = createAsyncThunk('carts/getCart', async () => {
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
  increaseCart, decreaseCart,
};

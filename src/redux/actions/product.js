import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';
import { refreshToken } from '../../utils/refreshToken';

const getProducts = createAsyncThunk('products/getProducts', async ({ category = null, sport = null } = {}, { rejectWithValue }) => {
  console.log('get product cat => ', category);
  const params = new URLSearchParams();
  category && params.append('category', category);
  sport && params.append('sport', sport);

  const stringParams = params.toString();
  try {
    const response = await fetch(`${baseURL}products?${stringParams}`);

    const result = await response.json();
    if (!response.ok) {

    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
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

const updateProduct = createAsyncThunk('updateProduct', async ({ editId, formData }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}products/${editId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const { message } = await response.json();

      return rejectWithValue({ message });
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const addProduct = createAsyncThunk('product/addproduct', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}products`, {
      method: 'POST',
      headers: {

        Authorization: `Bearer ${fetchToken()}`,
      },
      body: data,
    });
    const result = await response.json();

    if (!response.ok) {
      const errorMessages = result.message;
      const formattedError = Object.entries(errorMessages)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');
      return rejectWithValue({ message: formattedError });
    }

    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue({ message: 'Network error, please try again later.' });
  }
});

const deleteProduct = createAsyncThunk('product/deleteproduct', async (id) => {
  try {
    const response = await fetch(`${baseURL}products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
    });
    const result = await response.json();
    if (response.ok) {
      toast(response.message ?? 'Item successfully deleted', { type: 'success' });
    } else {
      throw result.error;
    }
  } catch (error) {
    console.log(error);
    toast(error ?? 'Item failed to delete', { type: 'error' });
  }
});

const getLetestProducts = createAsyncThunk('products/getProductsLatest', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}products/new_arrivals`);

    if (!response.ok) {
      return rejectWithValue({ message: response.message });
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

export {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct, getLetestProducts,
};

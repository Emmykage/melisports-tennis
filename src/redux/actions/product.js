import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;
// console.log(token(), "fectched")

const getProducts = createAsyncThunk('products/getProducts', async (_, {rejectWithValue}) => {

try {
  const response = await fetch(`${baseURL}products`)
  
  const result =  await response.json()
  if(!response.ok){
    return rejectWithValue({message: result.message})
  }
  return result
  
} catch (error) {
  return rejectWithValue({message: "Something went wrong"})
  
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

const updateProduct = createAsyncThunk('updateProduct', async ({ editId, formData }, {rejectWithValue}) => {
  try {
    const response = await fetch(`${baseURL}products/${editId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const {message} = await response.json();

      return rejectWithValue({message});
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

        Authorization: `Bearer ${token()}`,
      },
      body: data,
    });

    if (!response.ok) {
      const err = await response.json();
      const errorMessages = err.message;
      const formattedError = Object.entries(errorMessages)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('\n');
      return rejectWithValue({ message: formattedError });
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Network error, please try again later.' });
  }
});

const deleteProduct = createAsyncThunk('product/deleteproduct', async (id) => {
  await fetch(`${baseURL}products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // .then(res => res.text());
});

const getLetestProducts = createAsyncThunk('products/getProductsLatest', async (_, {rejectWithValue}) => {

  try {
    const response = await fetch(`${baseURL}products/new_arrivals`)

    if(!response.ok){
      return rejectWithValue({message: response.message})
    }


    const result = await response.json()
    return result

    
  } catch (error) {
    return rejectWithValue({message: "Something went wrong"})
    
  }
});

export {
  getProducts, getProduct, addProduct, deleteProduct, updateProduct, getLetestProducts
};

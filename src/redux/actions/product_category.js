import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const addProductCategory = createAsyncThunk('product_category/add_product_category', async (data, {rejectWithValue}) => {
  
  try {
    const response = await fetch(`${baseURL}product_categories`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if(!response.ok){
      const err = await response.json()
      return rejectWithValue(err)
    }
  
    const result = await response.json()
    return result
    
  } catch (error) {
    return rejectWithValue({message: "something went wrong"})
  }
 

});
const updateCategory = createAsyncThunk('product_category/update_product_category', async ({ id, data }) => {
  const response = await fetch(`${baseURL}product_categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),

  });
  return response;
});
const deleteCategory = createAsyncThunk('product_category/delete_product_category', async (id) => {
  await fetch(`${baseURL}product_categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },

  });
});
const getProductCategories = createAsyncThunk('product_category/get_product_category', async () => {
  const response = await fetch(`${baseURL}product_categories`).then((res) => res.json());
  return response;
});
export {
  addProductCategory, getProductCategories, updateCategory, deleteCategory,
};

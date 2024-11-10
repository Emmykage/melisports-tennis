import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';

const createOrder = createAsyncThunk('order/createOrder', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}order_details`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const updateOrder = createAsyncThunk('order/updateOrder', async (data, { rejectWithValue }) => {

  try {
    const response = await fetch(`${baseURL}order_details/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const deleteOrder = createAsyncThunk('order/deleteOrder', async (ID, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}order_details/${ID}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
    });
    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: 'failed to delete order' });
    }
    console.log(result);
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const getOrder = createAsyncThunk('order/get_order', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}order_details/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: result.error });
    }

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const getOrders = createAsyncThunk('orders/get_orders', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}order_details`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    // const
    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: result.error });
    }

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});
export {
  createOrder, getOrders, getOrder, updateOrder, deleteOrder,
};

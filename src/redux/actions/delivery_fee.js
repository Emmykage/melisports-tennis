import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';

export const addDeliveryFee = createAsyncThunk('deliveries/addDeliveryFee', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}deliveries`, {
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

export const updateDeliveryFee = createAsyncThunk('deliveryFee/update_delivery_fee', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}deliveries/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
      body: JSON.stringify({ delivery: data.delivery }),
    });
    const result = await response.json();
    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }
    console.log(result, 'result from update delivery fee');
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

export const deleteDeliveryFee = createAsyncThunk('delivery_fee/delete_delivery', async (ID, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}deliveries/${ID}`, {
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

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

export const getDeliveryFee = createAsyncThunk('delivery_fee/get_delivery_fee', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}deliveries/${id}`, {
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

export const getDeliveryFees = createAsyncThunk('delivery_fee/get_delivery_fees', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}deliveries`, {
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

export const sendMessage = createAsyncThunk('text/sendMessage', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}messages`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      rejectWithValue({
        message: res.message,
      });
    }

    return res;
  } catch (error) {
    return rejectWithValue({
      message: error.message ?? 'Something went wrong',
    });
  }
});

export const getMessages = createAsyncThunk('contact/getMessages', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}messages`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const res = await response.json();

    if (!response.ok) {
      rejectWithValue({
        message: res.message,
      });
    }

    return res;
  } catch (error) {
    return rejectWithValue({
      message: error.message ?? 'Something went wrong',
    });
  }
});

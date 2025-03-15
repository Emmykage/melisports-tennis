import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

export const sendReview = createAsyncThunk('review/sendreview', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: result?.error });
    }
    return response;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

export const getReviews = createAsyncThunk('reviews/get_reviews', async ({ rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}reviews`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: result?.error });
    }

    return result;
  } catch (error) {
    return rejectWithValue({ message: 'Something went wrong' });
  }
});

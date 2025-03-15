import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';

const getStatistics = createAsyncThunk('statistics/get_statistics', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${fetchToken()}`,
        'Content-Type': 'application/json',
      },

    });

    const result = await response.json();

    if (!response.ok) {
      return rejectWithValue({ message: result.message });
    }
    return result;
  } catch (error) {
    return rejectWithValue({ message: 'something went wrong' });
  }
});

export { getStatistics };

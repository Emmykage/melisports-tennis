import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../baseURL';

export const createAgents = createAsyncThunk('agent/create-agent', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}agents`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

export const getAgents = createAsyncThunk('agent/get-agents', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}agents`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

export const getAgent = createAsyncThunk('agent/get-agent', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}agents`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

export const updateAgent = createAsyncThunk('agent/update-agent', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${baseURL}agents/${id}`, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

export const delAgent = createAsyncThunk('agent/delete-agent', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseURL}agents/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

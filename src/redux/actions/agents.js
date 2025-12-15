import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';

export const createAgents = createAsyncThunk('agent/create-agent', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}agents`, data, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response?.data?.message || 'Sonething went wrong' });
  }
});

export const getAgents = createAsyncThunk('agent/get-agents', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}agents`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
    });
    const { data } = response.data;
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});

export const getAgent = createAsyncThunk('agent/GET_AGENT', async (id, { rejectWithValue }) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null),
  );

  const searchParams = new URLSearchParams(cleanedParams).toString();

  try {
    const response = await axios.get(`${baseURL}agents/${id}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,

      },
    });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    return rejectWithValue({ message: error.response.data.message });
  }
});
export const getAgentByCode = createAsyncThunk('agent/GET_AGENT_BY_CODE', async (code, { rejectWithValue }) => {
  console.log(code);

  try {
    const response = await axios.get(`${baseURL}agents/${code}/get_agent_by_code`, {
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

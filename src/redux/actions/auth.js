import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken, setToken } from '../../hooks/localStorage';

const addUser = createAsyncThunk('user/addUser', async (data) => {
  const response = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json());
  return response;
});
const loginUser = createAsyncThunk('user/logUser', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.error || result.message || 'unknownerror occured ';
      console.log('first it was reject', result.message);
      return rejectWithValue({ message: errorMessage });
    }
    setToken(result.token);
    return result;
  } catch (error) {
    console.error('error thrown', error);
    return rejectWithValue({ message: 'Spmething went wrong, check your internet Connection!!' });

    // throw new Error(error);
  }
});
const getUser = createAsyncThunk('user/getUser', async (id) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      // Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json());
  return response;
});

const userProfile = createAsyncThunk('user/userProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}users/userProfile`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result.message || result.error;
      return rejectWithValue({ message: errorMessage });
    }
    return result;
  } catch (error) {
    console.log('notock token');

    return rejectWithValue({ message: 'Something went wrong' });
  }
});

const getUsers = createAsyncThunk('users/getusers', async () => {
  const response = await fetch(`${baseURL}users`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${fetchToken()}`,
    },
  }).then((res) => res.json());
  return response;
});

const delUsers = createAsyncThunk('users/del_users', async (id) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${fetchToken()}`,
    },
  }).then((res) => res.json());
  return response;
});

const updateUser = createAsyncThunk('users/update_user', async ({ id, user }) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${fetchToken()}`,
    },
    body: JSON.stringify(user),
  });
  // .then(res => res.json())
  return response;
});
export {
  addUser, loginUser, getUser, getUsers, delUsers, updateUser, userProfile,
};

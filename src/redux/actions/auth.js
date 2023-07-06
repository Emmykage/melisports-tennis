import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const token = () => JSON.parse(localStorage.getItem('meli_auth')).token;

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
const loginUser = createAsyncThunk('user/logUser', async (data) => {
  const response = await fetch(`${baseURL}login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    // .catch((err) => err.json())
  return response;
});
const getUser = createAsyncThunk('user/logUser', async () => {
  const response = await fetch(`${baseURL}users/*`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  })
    .then((res) => res.json());
  return response;
});
export { addUser, loginUser, getUser };

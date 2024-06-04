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
    .then((res) => res.json());
    // .catch((err) => err.json())
  return response;
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

const getUsers = createAsyncThunk('users/getusers', async () => {
  const response = await fetch(`${baseURL}users`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  }).then((res) => res.json());
  return response;
});

const delUsers = createAsyncThunk('users/del_users', async (id) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  }).then((res) => res.json());
  return response;
});

const updateUser = createAsyncThunk('users/update_user', async ({ id, user }) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(user),
  });
  // .then(res => res.json())
  return response;
});
export {
  addUser, loginUser, getUser, getUsers, delUsers, updateUser,
};

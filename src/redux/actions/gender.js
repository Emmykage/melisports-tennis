import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const getGenders = createAsyncThunk('gender/get_genders', async () => {
  const response = await fetch(`${baseURL}genders`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

  return response;
});

export { getGenders };

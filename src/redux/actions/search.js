import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const searched = createAsyncThunk('search/products', async (data) => {
  const response = await fetch(`${baseURL}search`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return response;
});

export default searched;

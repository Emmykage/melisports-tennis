import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const sendMessage = createAsyncThunk('text/sendMessage', async (data) => {
  const response = await fetch(`${baseURL}messages`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return response;
});
export default sendMessage;

import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';

const sendReview = createAsyncThunk('review/sendreview', async (data, {rejectWithValue}) => {
  try {
    const response = await fetch(`${baseURL}reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if(!response.ok){
    return  rejectWithValue({message: result?.error})
    }
    return response;
  } catch (error) {
    return  rejectWithValue({message: "Something went wrong"})

  }

});
export default sendReview;

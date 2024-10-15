import { createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../baseURL';
import { fetchToken } from '../../hooks/localStorage';


const addOrder = createAsyncThunk('order/createOrder', async (data, {rejectWithValue}) => {
 try{
  const response = await fetch(`${baseURL}order_details`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${fetchToken()}`,

    },
    body: JSON.stringify(data),
  });
  const result = await response.json()
  if(!response.ok){
    return rejectWithValue({message: result.message})
  }

  return result;
 }catch(error){
  return rejectWithValue({message: "SOmething went wrong"})

 }

});

const getOrders = createAsyncThunk('orders/get_orders', async () => {
  const response = await fetch(`${baseURL}order_details`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  return response;
});
export { addOrder, getOrders };

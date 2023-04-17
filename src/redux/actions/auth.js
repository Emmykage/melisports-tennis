import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../baseURL";
const addUser = createAsyncThunk('user/addUser', async(data) =>{
    const response = await fetch(`${baseURL}users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    return response
})
const loginUser = createAsyncThunk('user/logUser', async(data) =>{
    const response = await fetch(`${baseURL}login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    // .catch((err) => err.json())
    return response
})
export {addUser, loginUser}
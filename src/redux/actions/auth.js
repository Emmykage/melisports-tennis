import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "https://melisports.herokuapp.com/api/v1/";
// const baseURL = "http://localhost:3000/api/v1/";

const addUser = createAsyncThunk('user/addUser', async(data) =>{
    // console.log(data)
    const response = await fetch(`${baseURL}users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    console.log(response)
    return response
})
const loginUser = createAsyncThunk('user/logUser', async(data) =>{
    const response = await fetch(`${baseURL}login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .catch((err) => err.json())
    
    const collect = JSON.stringify(response)
    localStorage.setItem('meli_auth', collect);

    console.log(response.token)

   return response
})
export {addUser, loginUser}
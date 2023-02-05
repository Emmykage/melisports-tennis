import { createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3000/api/v1/";
const addUser = createAsyncThunk('user/addUser', async(data) =>{
    await fetch(`${baseURL}users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()).then((res) => console.log(res))
    console.log(data)
})
export {addUser}
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()
const baseURL = "http://localhost:3000/api/v1/";
const addUser = createAsyncThunk('user/addUser', async(data) =>{
    const response = await fetch(`${baseURL}users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', response.user.username);
    return response    
})
const loginUser = createAsyncThunk('user/addUser', async(data, navigate) =>{
    const response = await fetch(`${baseURL}login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .catch((err) => err.json())
    // .then((data) => console.log(data))
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', response.user.username);

    // if(data.user){
    //     navigate('/')
    // }
    // navigate('/')
    console.log(response.token)

   return response
})
export {addUser, loginUser}
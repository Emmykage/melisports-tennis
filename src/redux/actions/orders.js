import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../baseURL";
let auth = localStorage.getItem("meli_auth")
let token 
if(auth){
    const userInfo = JSON.parse(auth)
     token = userInfo.token
     console.log(token)




}


const addOrder = createAsyncThunk("order/createOrder", async(data) => {
const response = await fetch(`${baseURL}order_details`, {
    method: "POST",
    headers: {
        "Content-type": 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
})
console.log(response, data)
return response
})
export { addOrder}
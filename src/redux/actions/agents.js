import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../baseURL";

export const addAgents = createAsyncThunk("agent/create-agent", async(data, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${baseURL}agents`,data, {
            headers: {
                "Content-type": "application/json"
            }
        })
                    const result = response.data
                    return result

    } catch (error) {
        return rejectWithValue({message: error.response.data.message

        })
    } 
})


export const getAgents = createAsyncThunk("agent/get-agent", async(data, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${baseURL}agents`,data, {
            headers: {
                "Content-type": "application/json"
            }
        })
                    const result = response.data
                    return result

    } catch (error) {
        return rejectWithValue({message: error.response.data.message

        })
    } 
})



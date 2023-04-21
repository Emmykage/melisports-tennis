import { createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../baseURL";

const getLevels = createAsyncThunk("level/get_levels", async()=> {
    const response = await fetch(`${baseURL}levels`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    }).then((res) => res.json())
    return response
})


export {getLevels}
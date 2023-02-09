import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/auth";

const initialState = {
    user: {},
    error: false,
    message: ""
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:  {
        [loginUser.fulfilled]: (state, action) => {
            
            if(action.payload.user){
                // console.log(action.payload.user)
                return {
                    ...state,
                    user: action.payload
                }
            }
            else{
                console.log(action.payload.error)
                return {
                    ...state,
                    error: true,
                    message: action.payload.error
                }
            }
          

    },
        [loginUser.rejected]: (state, action) => {
            console.log(action.payload)
           return {
            ...state,
            error: true,
            message: action.error
        }},
    }
})

export default userSlice.reducer
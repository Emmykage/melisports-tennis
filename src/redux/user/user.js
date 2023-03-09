import { createSlice } from "@reduxjs/toolkit";
import { addUser, 
    loginUser
 } from "../actions/auth";

const initialState = {
    user: {},
    error: false,
    message: "",
    loading: false,
    logged: false
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toLogin: (state) =>({
            ...state,
            logded: false
        })
    },
    extraReducers:  {
        [addUser.fulfilled]: (state, action) => {
            console.log("fulfilled")
            const response = action.payload
            if(response.user){
                console.log("fulfilled and passed")

                const collect = JSON.stringify(response)
                localStorage.setItem('meli_auth', collect);
                return{
                    ...state,
                    logged: true,
                    message: "sign up successfull"
                }
            }else{
                console.log("yes fulfillled but failed")

                return{
                    ...state,
                    loading: false,
                    error: true,
                    message: action.payload.error
                }
            }
        
        },
        [addUser.rejected]: (state, action) => {
            console.log("failed", action.payload.error)
            return{
                ...state,
                error: true,
                message: "failed to create an account"
            }
        },
        [addUser.pending]: (state, action)=> {
            return{
                ...state,
                loading: true
            }
        },
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
export const {toLogin} =  userSlice.actions

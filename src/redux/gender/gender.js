import { createSlice } from "@reduxjs/toolkit";
import { getGenders } from "../actions/gender";

const initialState = {
    genders: []
}

const genderSlice = createSlice({
    name: 'gender',
    initialState,
    extraReducers: {
        [getGenders.fulfilled]: (state, action) => ({
            ...state,
            genders: action.payload

        })
    }
})

export default genderSlice.reducer
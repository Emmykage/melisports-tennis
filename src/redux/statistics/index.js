import { createSlice } from "@reduxjs/toolkit"
import { getStatistics } from "../actions/statistics"

const initialState = {
    stats: {}
}

const statSlice = createSlice({
    initialState,
    name: "statistics",
    extraReducers: {
        [getStatistics.fulfilled]: (state, action) => {

            return{
                ...state.action,
                stats: action.payload
            }
        }
    }
})


export default statSlice.reducer
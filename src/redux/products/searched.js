import { createSlice } from "@reduxjs/toolkit";
import { searched } from "../actions/search";

const initialState = {
    searchedProducts: [],
    displayedList: false
}

const searchSlice = createSlice({
    name: "searched_products",
    initialState,
    reducers: {
        displayList: (state)=>({
            ...state,
            displayedList: true
        }),
        closeList: (state) => ({
            ...state,
            displayedList: false

        })
    },
    extraReducers: {
        [searched.fulfilled]: (state, action) => {
        //    console.log(action.payload)
            return{
            ...state,
            searchedProducts: action.payload
        }
    }
    },
   
})

export default searchSlice.reducer
export const { displayList, closeList} = searchSlice.actions
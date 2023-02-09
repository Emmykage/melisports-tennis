import { createSlice } from "@reduxjs/toolkit";
const initialState={
    catOpen: false,
    catId: ''
}

const delCatSlice = createSlice({
    name: "del_category",
    initialState,
    reducers: {
        openDelCatModal: (state, action) =>{
            
            return{
            ...state,
            catOpen: true,
            catId: action.payload
        }},
        closeDelCatModal: (state) => ({
            ...state,
            catOpen: false
        })
    }
})

export const {openDelCatModal, closeDelCatModal} = delCatSlice.actions
export default delCatSlice.reducer

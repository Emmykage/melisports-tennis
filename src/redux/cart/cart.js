import { createSlice } from "@reduxjs/toolkit";
// import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import cartItems from "../../service/cartItems";
const initialState ={
    cartItems: cartItems,
    amount: 0 ,
    total: 0,
    isLoading: true
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems = [];
        },
        removeItem: (state, action) =>{
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, action) =>{
            const itemId = action.payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, action) =>{
            const itemId = action.payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            console.log(itemId)
            cartItem.amount = cartItem.amount - 1
        }, 
        calculateTotal: (state) =>{
            let total = 0;
            let amount = 0;
            state.cartItems.forEach((item) =>{
               amount += item.amount
               total += item.amount * item.price
              
            })
            amount = cartItems.length
            state.amount = amount
            state.total = total
        }
    }
})
export const {clearCart, removeItem, increase, decrease, calculateTotal} = cartSlice.actions
export default cartSlice.reducer
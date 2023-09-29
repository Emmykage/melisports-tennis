import { createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../service/cartItems';
import { getCarts } from '../actions/cart';


const initialState = {
  cartItems: [],
  message: '',
  counter: 0,
  total: 0,
  status: 'false',
  isLoading: true,
  update: 0,

};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action)=>{
      
      let prevStorage = JSON.parse(localStorage.getItem("cartitem"))
            console.log(prevStorage)
    

      if(prevStorage == null){
        const newCartArray = [action.payload]        
        localStorage.setItem("cartitem", JSON.stringify(newCartArray))
        return {
          ...state,
          cartItems: JSON.parse(localStorage.getItem("cartitem"))
        }
      }else{
        const cartExist = prevStorage.find(cart => cart.product_id == action.payload.product_id)

        if(cartExist == undefined){
          const newCartArray = [...prevStorage, action.payload]
          prevStorage = localStorage.setItem("cartitem", JSON.stringify(newCartArray))
          return {
            ...state,
            cartItems: prevStorage
          }
        }else{
          let storage = JSON.parse(localStorage.getItem("cartitem"))
          let updateCart = storage.map(item => {
            if(item.product_id == action.payload.product_id){
              item.quantity = action.payload.quantity
            }
            return item
          })
           localStorage.setItem("cartitem", JSON.stringify(updateCart))
          
        }
       

      }
      prevStorage = JSON.parse(localStorage.getItem("cartitem"))
      // console.log(prevStorage)
      return {
        ...state,
        cartItems: prevStorage
      }
     

    },
    updateQty: (state, action) => {
      let prevStorage = JSON.parse(localStorage.getItem("cartitem"))
      console.log(action.payload)
      let updateCart = prevStorage.map(item => {
        if(item.product_id == action.payload.product_id){
          item.quantity = action.payload.quantity
        }
        return item
      })
      localStorage.setItem("cartitem", JSON.stringify(updateCart))

      return{
        ...state,
        cartItems: updateCart
      }
        },

    deleteCart: (state, action) => {
      let prevStorage = JSON.parse(localStorage.getItem("cartitem"))

      return{
        ...state,
        cartItems: prevStorage.filter(cart => {
          return cart.product_id == action.payload.product_id
        })

      }
    


    },


    updater: (state) => ({
      ...state,
      update: state.update + 1,
    }),
    clearCart: (state) => {
      let updateCart = []
      localStorage.setItem("cartitem", JSON.stringify(updateCart))

      return{
        ...state,
        cartItems: []
      }
    },
    calculateTotal: (state) => {
      let total = 0;
      let count = 0;
      let trans = JSON.parse(localStorage.getItem("cartitem"))
      
      if(trans === null){trans = []}
      if (trans.length > 0) {
        trans.forEach((item) => {
          count += item.quantity;
          total += item.quantity * item.price;
        });
        return {
          ...state,
          counter: count,
          total,
        };
        
      }

      return {
        ...state,
        counter: 0,
        total: 0,
      };
      
    },
  },
  extraReducers: {
    [getCarts.fulfilled]: (state, action) => {
      
      try {
        let trans = JSON.parse(localStorage.getItem("cartitem"))
        console.log(trans)

        return {
          ...state,
          cartItems: trans,

        };
      } catch {
        return {
          ...state,
          cartItems: [],
        };
      }
   
    },

    // [clearCart.fulfilled]: (state) => ({
    //   ...state,
    // }),
    // [addCart.fulfilled]: (action) => {
    // },

  },
});
export const {
  removeItem, updateQty, updater, calculateTotal, addItem, addCart, clearCart
} = cartSlice.actions;
export default cartSlice.reducer;

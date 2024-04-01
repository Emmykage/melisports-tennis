import { createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../service/cartItems';
import { getCarts } from '../actions/cart';


const setCart = (cartItems) => {
  localStorage.setItem('cartitem', JSON.stringify(cartItems));
};
const getCart = () =>{
 const carts = JSON.parse(localStorage.getItem('cartitem'));

  if(carts == null){
    return []
  }
  else{
    return carts
  }

}
const refCart = () => getCart().map(cart => {
  return{
    product_id: cart.product_id,
    price: cart.price,
    product_name: cart.product_name,
    image: cart.image,
    quantity: cart.quantity,
    subTotal: cart.quantity * cart.price
  }
})



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
    addCart: (state, action) => {
      getCart();
      // console.log([action.payload], action.payload)

      if (getCart() == null || getCart().length < 1) {
        const newCartArray = [action.payload];
        setCart(newCartArray);
        console.log("Sis less")
        return {
          ...state,
          cartItems: getCart(),
        };
      }

      // jjh
      const cartExist = getCart().find((cart) => cart.product_id == action.payload.product_id);
      console.log(cartExist)
      if (cartExist == undefined) {
        const newCartArray = [...getCart(), action.payload];
        setCart(newCartArray);
        return {
          ...state,
          cartItems: getCart(),
        };
      }
      const storage = getCart();
      const updateCart = storage.map((item) => {
        if (item.product_id == action.payload.product_id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
      localStorage.setItem('cartitem', JSON.stringify(updateCart));

      return {
        ...state,
        cartItems: refCart(),
      };
    },
    getLocalCart: (state) => {
      return{
        ...state,
        cartItems: refCart()
      }
    },
    updateQty: (state, action) => {
      const updateCart = getCart().map((item) => {
        if (item.product_id == action.payload.product_id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
      setCart(updateCart);

      return {
        ...state,
        cartItems: refCart(),
      };
    },

    removeItem: (state, action) => {
      console.log(action.payload)


      const filterdCart = getCart().filter((cart) => cart.product_id !== action.payload)
      console.log(getCart(), filterdCart)
      setCart(filterdCart)
      return{
      ...state,
      cartItems: refCart()
      }
    },

    updater: (state) => ({
      ...state,
      update: state.update + 1,
    }),
    clearCart: (state) => {
      const updateCart = [];
      setCart(updateCart);

      return {
        ...state,
        cartItems: getCart(),
      };
    },
    calculateTotal: (state) => {
      let total = 0;
      let count = 0;
      let trans = getCart();

      if (trans === null) { trans = []; }
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
        const trans = JSON.parse(localStorage.getItem('cartitem'));

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

  },
});
export const {
  removeItem, updateQty, updater, calculateTotal, addItem, addCart, clearCart, getLocalCart
} = cartSlice.actions;
export default cartSlice.reducer;

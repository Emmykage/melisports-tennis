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

      if (getCart() == null || getCart().length < 1) {
        const newCartArray = [action.payload];
        setCart(newCartArray);
        return {
          ...state,
          cartItems: getCart(),
        };
      }

      // jjh
      const cartExist = getCart().find((cart) => cart.product_id == action.payload.product_id);
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
      console.log(refCart())
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


      const filterdCart = getCart().filter((cart) => cart.product_id !== action.payload)
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
        // const trans = JSON.parse(localStorage.getItem('cartitem'));

        return {
          ...state,
          cartItems: refCart(),

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

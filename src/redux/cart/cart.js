import { createSlice } from '@reduxjs/toolkit';
import { getCarts } from '../actions/cart';
import { getCart, setCart } from '../../hooks/localStorage';

const refCart = () => getCart().map((cart) => ({
  product_id: cart.product_id,
  price: cart.price,
  product_name: cart.product_name,
  image: cart.image,
  quantity: cart.quantity,
  subTotal: cart.quantity * cart.price,
}));

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

      if (!getCart() || getCart().length < 1) {
        const newCartArray = [action.payload];
        setCart(newCartArray);
 
      }

      const cartExist = getCart().find((cart) => cart?.product_id == action.payload.product_id);
      if (!cartExist) {
        const newCartArray = [...getCart(), action.payload];
        setCart(newCartArray);
  
      }
      else{
        const updateCart =  getCart().map((item) => {
          if (item.product_id == action.payload.product_id) {
            item.quantity = action.payload.quantity;
          }
          return item;
        });
        setCart(updateCart)
      }
      

      return {
        ...state,
        cartItems: refCart(),
      };
    },
    getLocalCart: (state) => ({
      ...state,
      cartItems: refCart(),
    }),
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
      const filterdCart = getCart().filter((cart) => cart.product_id !== action.payload);
      setCart(filterdCart);
      return {
        ...state,
        cartItems: refCart(),
      };
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
  removeItem, updateQty, updater, calculateTotal, addItem, addCart, clearCart, getLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart, increase, decrease, calculateTotal,
} from '../redux/cart/cart';
import { decreaseCart, increaseCart, removeItem } from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
import Modal from '../components/modal/Modal';
import { getCarts } from '../redux/actions/cart';

const Cart = () => {
  let [count, setCount] = useState(0)
  const isOpen = useSelector((state) => state.modal.isOpen);
  const { cartItems, total } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(null)
  const [items, setItem] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    getItem()
    dispatch(getCarts())
    
  },[total])
  const getItem = ()=>{
    setItem(cartItems)
    setQuantity(count)
      // setCount(cartItems[0].quantity)

  }
  // console.log(items)
  if (items.length < 1) {
    return (
      <div>
        <header>
          <h2> Your bag</h2>
          <h4> You cart is currently empty</h4>
        </header>
      </div>
    );
  }

  const handleUpdate = (id, data)=>{
    dispatch(increaseCart(id, data))
  }
  const selectCart = (id, quantity, sign)=>{
    // const selectedItem = cartItems.filter((item) => item.id == id)
    if(sign ==="+"){
      const addQuantity = quantity + 1
      dispatch(increaseCart({ id, quantity: addQuantity}))

    }else{
      const minusQuantity = quantity - 1
      dispatch(decreaseCart({ id, quantity: minusQuantity}))

    }
    
    // console.log(addQuantity)
  }
  return (
    <>
      <div className="cart-div">
        <ul className='flex-center'>
          {items.map((cart) => (
            <li key={cart.id} className="flex-center div-center-flex">
              <div className="cart-img">
                <img src={cart.product.image} />
              </div>
              <div className='cart-det'>
                <p>
                  {cart.product.name}
                </p>
                <p>{cart.product.price}</p>
                <button className='btn m-h4' onClick={() => { dispatch(removeItem(cart.id)); }}> remove</button>
              </div>
              <div className='cart-btn flex-center'>
                <div>

              
              <button className='btn' 
              onClick={()=> {
                selectCart(cart.id, cart.quantity, '-' )
              cart.quantity ===1 && dispatch(removeItem(cart.id))}}
              // onClick={() => {
              //   if (cart.quantity === 1) {
              //     dispatch(removeItem(cart.id));
              //     console.log(id)
              //   }
              //   dispatch(decrease(cart.id));
              // }}
              >
                -
              </button>
              <span className='cart-count'>
              {/* {cart.quantity}  */}
              {/* {count=cart.quantity} */}
              {cart.quantity}
              </span>
              
              <button className='btn' 
              type="button" 
              // onClick={() => dispatch(increase(cart.id))}
              onClick={()=> selectCart(cart.id, cart.quantity, '+' )}
              
              >
                +
                </button>
              </div>
              </div>
            </li>
          ))}
        </ul>

        <p>{total}</p>
        <button className='m-h4' type="button"  onClick={() => dispatch(openModal())}>clear cart </button>
      </div>
    </>
  );
};

export default Cart;

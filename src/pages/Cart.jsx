import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart, increase, decrease, calculateTotal,
} from '../redux/cart/cart';
import { removeItem } from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
import Modal from '../components/modal/Modal';
import { getCarts } from '../redux/actions/cart';

const Cart = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCarts())
  },[])
console.log(cartItems)
  if (cartItems.length < 1) {
    return (
      <div>
        <header>
          <h2> Your bag</h2>
          <h4> You cart is currently empty</h4>
        </header>
      </div>
    );
  }
  // const callModal = () =>{
  //     dispatch(openModal())
  // }
  return (
    <>
      {/* {isOpen && <Modal />} */}

      <div className="cart-div">
        <ul className='flex-center'>
          {cartItems.map((cart) => (
            <li key={cart.id} className="flex-center">
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
              <button className='btn' onClick={() => {
                if (cart.quantity === 1) {
                  dispatch(removeItem(cart.id));
                  console.log(id)
                }
                dispatch(decrease(cart.id));
              }}
              >
                -
              </button>
              <span className='cart-count'>
              {cart.quantity}
              </span>
              
              <button className='btn' type="button" onClick={() => dispatch(increase(cart.id))}>+</button>
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

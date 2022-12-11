import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart, removeItem, increase, decrease, calculateTotal,
} from '../redux/cart/cart';
import { openModal } from '../redux/modal/modal';
import Modal from '../components/modal/Modal';

const Cart = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  // const dispatch = useDispatch()
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);

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
                <img src={cart.image} />
              </div>
              <div className='cart-det'>
                <p>
                  {cart.title}
                </p>
                <p>{cart.price}</p>
                <button className='btn m-h4' onClick={() => { dispatch(removeItem()); }}> remove</button>
              </div>
              <div className='cart-btn flex-center'>
              <button className='' onClick={() => {
                if (cart.amount === 1) {
                  dispatch(removeItem(cart.id));
                }
                dispatch(decrease(cart.id));
              }}
              >
                -
              </button>
              {cart.amount}
              <button type="button" onClick={() => dispatch(increase(cart.id))}>+</button>
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

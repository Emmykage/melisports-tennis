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
  console.log(isOpen);

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
        <ul>
          {cartItems.map((cart) => (
            <li key={cart.id} className="flex-center">
              <div className="cart-img">
                <img src={cart.image} />
              </div>
              <div>
                <p>
                  {cart.title}
                </p>
                <p>{cart.price}</p>
                <button onClick={() => { dispatch(removeItem()); }}> remove</button>
              </div>
              <button onClick={() => {
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

            </li>
          ))}
        </ul>

        <p>{total}</p>
        <button type="button"  onClick={() => dispatch(openModal())}>clear cart </button>
      </div>
    </>
  );
};

export default Cart;

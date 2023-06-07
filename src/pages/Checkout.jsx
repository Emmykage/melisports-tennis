import React, { useState } from 'react';
import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../redux/actions/orders';
import StripeContainer from './StripeContainer';

const Checkout = () => {
  // const dispatch = useDispatch();
  const { total, cartItems, counter } = useSelector((state) => state.cart);

  return (
    <div className="checkout">
      <div className=" col-left">
        <h2>Billings </h2>
        <form action="">
          

        </form>
        <div>
        <h1> The store</h1>
        <StripeContainer total_cost={total} cartItems={cartItems}/>
      </div>

      </div>
      <div className="col-right">
        <h3> Order summary</h3>
        <ul>
          <li className="flex">
            <span>
              {' '}
              {counter}
              {' '}
              items
            </span>
          </li>
          <hr />
          <li className="flex-space">
            <span> SUBTOTAL</span>
            {' '}
            <span>{total}</span>
          </li>
          <hr />
          <li className="flex-space">
            <span> CART TOTAL</span>
            <span>{total}</span>
          </li>
        </ul>

      </div>
      

    </div>
  );
};

export default Checkout;

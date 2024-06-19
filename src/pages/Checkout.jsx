import React, { useEffect } from 'react';
// import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
// import { addOrder } from '../redux/actions/orders';
import StripeContainer from './StripeContainer';

import { reset } from '../redux/order/order';
import { naira_format } from '../components/utils/naira_format';

const Checkout = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const { total, counter } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <div className="checkout">
      <div className=" col-left">
        <h2>Billings </h2>
        <form action="" />
        <div className="p-1">
          <h1 className="text-xl font-normal"> The store</h1>
          <StripeContainer total_cost={total} />
          {/* {showItem ? <StripeContainer total_cost={total}/> : <><h3>{total}</h3><button onClick={()=> setShowItem(true) }>Purchase Product</button> </> } */}
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
          <li className="flex justify-between items-center">
            <span> SUBTOTAL</span>
            {' '}
            <span>{naira_format(total)}</span>
          </li>
          <hr />
          <li className="flex justify-between items-center">
            <span> CART TOTAL</span>
            <span>{naira_format(total)}</span>
          </li>
        </ul>

      </div>

    </div>
  );
};

export default Checkout;

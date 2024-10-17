import React, { useEffect } from 'react';
// import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
// import { addOrder } from '../redux/actions/orders';
import StripeContainer from './StripeContainer';

import { reset } from '../redux/order/order';
import { naira_format } from '../utils/naira_format';
import PaymentForm from '../components/form-payment/PaymentForm';

const Checkout = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const { total, counter } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <div className="checkout bg-light flex flex-col md:flex-row gap-10 max-w-[1500px]  m-auto p-4 md:p-20">
      <div className="flex-1 col-left bg-white p-4 rounded">
        <h2>Billings </h2>
        <form action="" />
        <div className="p-1">
          <h1 className="text-xl font-medium"> Melisport</h1>
          {/* <StripeContainer total_cost={total} /> */}
          <PaymentForm amount={total} />

        </div>

      </div>
      <div className="col-right md:max-w-[300px] w-full px-1.5 py-6 bg-white rounded shadow h-max flex-1  ">
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

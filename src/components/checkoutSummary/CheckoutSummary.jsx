import React from 'react';
import { nairaFormat } from '../../utils/nairaFormat';

const CheckoutSummary = ({ amount, counter }) =>
// const { total, counter } = useSelector((state) => state.cart);

  (
    <div className="col-right md:max-w-[270px] lg:max-w-[370px] w-full px-2.5 py-6 bg-white rounded shadow h-max flex-1">
      <h3 className="text-lg tracking-wider font-normal"> Order summary</h3>
      <ul>
        <li className="flex my-3">
          <span>
            {' '}
            {counter}
            {' '}
            { counter > 1 ? 'items' : 'item' }
          </span>
        </li>
        <hr />
        <li className="flex justify-between items-center my-2">
          <span> SUBTOTAL</span>
          {' '}
          <span>{nairaFormat(amount)}</span>
        </li>
        <hr />
        <li className="flex justify-between items-center my-2">
          <span> CART TOTAL</span>
          <span>{nairaFormat(amount)}</span>
        </li>
      </ul>

    </div>
  );

export default CheckoutSummary;

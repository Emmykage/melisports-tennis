import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { FiMinus } from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import { nairaFormat } from '../../utils/nairaFormat';
import { getAgentByCode } from '../../redux/actions/agents';

const CheckoutSummary = ({
  amount, referal, setReferal, counter, shippingFee = 0, netTotal, subTotal, discount, discountedAmount, handleAgentFetch,
}) => {
  const [toggleInput, setToggleInput] = useState(false);

  console.log(!!referal, toggleInput);

  return (
    <div className="col-right border sticky top-40  md:max-w-[270px] lg:max-w-[370px] w-full px-2.5 py-6 bg-light rounded shadow h-max flex-1">
      <div className="transition-all duration-300 ease-linear h-auto">

        <button onClick={() => setToggleInput((prev) => !prev)} className="active:bg-theme active:text-white flex text-xs max-w-sm w-full items-center border py-2 border-theme px-3 rounded-lg cursor-pointer  mb-4">
          <span>
            {!toggleInput
              ? <MdAdd className="text-2xl" />
              : <FiMinus className="text-2xl" />}
          </span>

          <span className="font-medium text-sm ml-4 ">{!toggleInput ? 'Add a Promotional Code' : 'Cancel Coupon'}</span>

        </button>

        {(toggleInput || !!referal)

      && (
      <div className="flex flex-col gap-4 mb-3">
        <div className="flex-1">
          <label htmlFor="referal" className="text-base text-gray-600">Referal Code</label>

          <input
            type="text"
            className="p-3  border-none w-full rounded focus:border-none focus:outline-none"
            name="referal"
            maxLength={6}
            value={referal}
            onBlur={() => handleAgentFetch()}
            disabled={referal && !handleAgentFetch}
            onChange={(e) => setReferal(e.target.value.toUpperCase())}
          />
        </div>

        <hr />

      </div>
      )}

      </div>
      <h3 className="text-lg tracking-wider text-gray-600 font-normal"> Order summary</h3>
      <ul>
        <li className="flex my-3 justify-between">
          <span className="font-semibold text-gray-600">
            {' '}
            (
            {counter}
            )
            {' '}
            { counter > 1 ? 'items' : 'item' }
          </span>
          <span>{nairaFormat(amount)}</span>

        </li>

        {discount

        && (
        <li className="flex justify-between items-center my-2">
          <span className="font-semibold text-gray-600"> Referal Discount</span>
          {' '}
          <span>{nairaFormat(discountedAmount)}</span>
        </li>
        ) }
        {' '}
        <li className="flex justify-between items-center my-2">
          <span className="font-semibold text-gray-600"> SUBTOTAL</span>
          {' '}
          <span>{nairaFormat(subTotal)}</span>
        </li>
        <li className="flex justify-between items-center my-2">
          <span> Shipping Fee</span>
          {' '}
          <span>{nairaFormat(shippingFee)}</span>
        </li>

        <li className="flex justify-between items-center my-2">
          <span className="font-semibold text-gray-600"> YOUR TOTAL</span>
          <span>{nairaFormat(netTotal)}</span>
        </li>
      </ul>

    </div>
  );
};
export default CheckoutSummary;

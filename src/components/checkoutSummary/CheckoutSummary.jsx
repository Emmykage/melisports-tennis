import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { nairaFormat } from '../../utils/nairaFormat';

const CheckoutSummary = ({
  amount, referal, setReferal, counter, shippingFee = 0,
}) => {
  const [toggleInput, setToggleInput] = useState(false);
  return (
    <div className="col-right md:max-w-[270px] lg:max-w-[370px] w-full px-2.5 py-6 bg-primary/20 rounded shadow h-max flex-1">
      <div className="transition-all duration-300 ease-linear h-auto">

        <button onClick={() => setToggleInput((prev) => !prev)} className="active:bg-theme active:text-white flex text-xs items-center border py-2 border-theme px-3 rounded-lg cursor-pointer  mb-4">
          <span>
            <MdAdd className="text-2xl" />
          </span>

          <span className="font-medium text-sm ">Add a Promotional Code</span>

        </button>

        {toggleInput

      && (
      <div className="flex flex-col gap-4 mb-3">
        <div className="flex-1">
          <label htmlFor="referal">Referal Code</label>

          <input type="text" className="p-3 border w-full rounded" name="referal" maxLength={6} value={referal} onChange={(e) => setReferal(e.target.value.toUpperCase())} />
        </div>

        <div>
          <span>Referal: </span>
        </div>
        <hr />

      </div>
      )}

      </div>
      <h3 className="text-lg tracking-wider font-normal"> Order summary</h3>
      <ul>
        <li className="flex my-3 justify-between">
          <span>
            {' '}
            (
            {counter}
            )
            {' '}
            { counter > 1 ? 'items' : 'item' }
          </span>
          <span>{nairaFormat(amount)}</span>

        </li>

        <hr />
        <hr />
        <li className="flex justify-between items-center my-2">
          <span> SUBTOTAL</span>
          {' '}
          <span>{nairaFormat(amount)}</span>
        </li>
        <li className="flex justify-between items-center my-2">
          <span> Shipping Fee</span>
          {' '}
          <span>{nairaFormat(shippingFee)}</span>
        </li>
        <hr />
        <li className="flex justify-between items-center my-2">
          <span> YOUR TOTAL</span>
          <span>{nairaFormat(amount + shippingFee)}</span>
        </li>
      </ul>

    </div>
  );
};
export default CheckoutSummary;

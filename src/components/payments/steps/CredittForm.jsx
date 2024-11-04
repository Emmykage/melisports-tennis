import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { clearCart } from '../../../redux/cart/cart';
import Button from '../../buttons/Button';

const CreditForm = ({ setStep, billingDetails, setBillingDetails }) => {
  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,

    });
  };

  const handleSUbmit = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };
  return (
    <form onSubmit={handleSUbmit} className="flex-1">
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="my-1 block">Name</label>
          {' '}
          <input required className="p-3 border w-full rounded" type="text" value={billingDetails.name} name="name" onChange={handleChange} />
        </div>

        <div className="mb-3">
          {' '}
          <label htmlFor="email" className="my-1 block">Email address</label>
          {' '}
          <input required type="email" className="p-3 border w-full rounded" value={billingDetails.email} name="email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          {' '}
          <label htmlFor="phone_number" className="my-1 block">Phone Number</label>
          {' '}
          <input required type="text" className="p-3 border w-full rounded" value={billingDetails.phone_no} name="phone_no" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="font-medium my-1 block">Street</label>
          <input required type="text" className="p-3 border w-full rounded" name="street" value={billingDetails.street} onChange={handleChange} />
        </div>

        <div className="mb-3 gap-5">
          <label htmlFor="country" className=" font-medium my-1 block">city</label>
          <input required type="text" className="p-3 border w-full rounded" name="city" value={billingDetails.city} onChange={handleChange} />

        </div>

        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label htmlFor="state">State</label>
            <input required type="text" className="p-3 border w-full rounded" name="state" value={billingDetails.state} onChange={handleChange} />
          </div>
          <div className="flex-1">
            <label htmlFor="postal_code">postal_code</label>
            <input className="p-3 border w-full rounded" type="text" name="postal_code" value={billingDetails.postal_code} onChange={handleChange} />
          </div>
        </div>

        <div className="py-10 flex justify-end">
          <Button className="flex gap-2" btnText="">
            Proceed
            <FaArrowRight />
          </Button>

        </div>

      </div>

    </form>
  );
};

export default CreditForm;

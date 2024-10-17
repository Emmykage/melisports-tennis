import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PaymentField = ({ billingDetails, setBillingDetails }) => {
  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <form onSubmit={handleSUbmit}>


    <div>
      <div>
        <label htmlFor="">Name</label>
        {' '}
        <input type="text" value={billingDetails.name} name="name" onChange={handleChange} />
      </div>

      <div>
        {' '}
        <label htmlFor="email">Email address</label>
        {' '}
        <input type="email" value={billingDetails.email} name="email" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="country">city</label>
        <input type="text" name="city" value={billingDetails.city} onChange={handleChange} />
      </div>

      <div className="flex gap-1">
        <div className="flex-3">
          <label htmlFor="">State</label>
          <input type="text" name="state" value={billingDetails.state} onChange={handleChange} />
        </div>
        <div className="flex-2">
          <label htmlFor="">postal_code</label>
          <input type="text" name="postal_code" value={billingDetails.postal_code} onChange={handleChange} />
        </div>
      </div>

      <div>

        {/* <input type="submit" value="place order" onClick={handlePurchase} /> */}
      </div>

    </div>
    <PaystackButton type="button"/>
    </form>

  );
};

export default PaymentField;

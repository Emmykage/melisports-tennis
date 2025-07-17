import React, { useState } from 'react';
import {
  CardElement, PaymentElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
// import StatusMessages from './StatusMessages'
import axios from 'axios';

import baseURL from '../redux/baseURL';
import PaymentField from '../components/PaymentForm';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4foff',
      color: '#333',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#110',
    },
  },
};

const PaymentForm = ({ total_cost }) => {
  // const [billingDetails, setBillingDetails] = useState({
  //   name: '',
  //   email: "",
  //   address: {
  //     city: "",
  //     postal_code: "",
  //     state: ""
  //   }
  // })
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',

    city: '',
    postal_code: '',
    state: '',

  });
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const billings = {
      name: billingDetails.name,
      email: billingDetails.email,
      address: {
        city: billingDetails.city,
        postal_code: billingDetails.postal_code,
        state: billingDetails.state,
      },
    };

    const { data: client_secret } = await axios.post(`${baseURL}payment_intents`, {
      amount: total_cost * 100,
    });
    const cardElement = elements.getElement(CardElement);
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billings,
    });

    const confirmCardPayment = await stripe.confirmCardPayment(client_secret.client_secret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
  };

  return (
    <>
      {/* {!success?  */}
      <form
        onSubmit={handleSubmit}
        className="stripe"
      >
        <fieldset className="FormGroup">
          <PaymentField billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
          <div className="FormRow my-3">
            <CardElement options={CARD_OPTIONS} />

          </div>
        </fieldset>
        <small>
          By clicking the button, you agree to the
          {' '}
          <a href="#">Terms and Conditions</a>
        </small>
        <button>Pay</button>

      </form>
      {' '}
      :
      <div>
        <h2> Experience the magic!!!</h2>
      </div>
      {/* } */}

    </>
  );
};

export default PaymentForm;

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowCircleDown } from 'react-icons/fa';
import {
  Box, Step, StepLabel, Stepper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StripeContainer from './StripeContainer';

import { resetOrder } from '../redux/order/order';
import CheckoutSummary from '../components/checkoutSummary/CheckoutSummary';
import CreditForm from '../components/payments/steps/CredittForm';
import PaymentMethod from '../components/payments/steps/PaymentMethod';
import ConfirmPayment from '../components/payments/steps/ConfirmPayment';
import { createOrder } from '../redux/actions/orders';
import { getDeliveryFees } from '../redux/actions/delivery_fee';
import Nav from '../components/nav/Nav';
import { emptyCart } from '../redux/actions/cart';
import { getAgentByCode } from '../redux/actions/agents';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deliveryFees } = useSelector((state) => state.deliveryFees);
  const [billingDetails, setBillingDetails] = useState({
    name: '', email: '', state: '', city: '', street: '', phone_no: '', postal_code: '', payment_method: '',
  });

  const { agent } = useSelector((state) => state.agent);

  const selectedState = deliveryFees.find((item) => item.state === billingDetails.state);
  const { loading, status } = useSelector((state) => state.orders);
  const { total, counter, cartItems } = useSelector((state) => state.cart);
  const [step, setStep] = useState(0);
  const [referal, setReferal] = useState('');
  const shippingFee = Number(selectedState?.delivery_fee ?? 0);
  let [discountedAmount, setdisountedAmount] =  useState(0);
  const subTotal = total - discountedAmount;
  const netTotal = subTotal + shippingFee;
  const handleAgentFetch = () => {
    dispatch(getAgentByCode(referal));
  };

  const orderItems = cartItems.map((item) => (
    {
      product_id: item.product_id,
      quantity: item.quantity,
      bonus: agent?.discount ? (agent.discount / 100) * item.price : 0,
      amount : item.price,
      size: item.size,
    }

  ));

  const data = {
    order_detail: {
      total,
      order_items_attributes: orderItems,
      billing_address_attributes: billingDetails,
      status: 'pending',
      payment_method: billingDetails.payment_method,
      referral_code: referal,
      sub_total: subTotal,
      net_total: netTotal,
      discount: agent?.discount,
      agent_id: agent?.id ?? null,

    },
  };


  const refindCartItems = useMemo(() => {
    let accBonus = 0;
  const items = cartItems.map((item) => {
    const bonus = (agent?.discount && !item?.discount_amount && (item.category !== 'accessory')) ? (agent.discount / 100) * item.price : 0;
    accBonus += bonus;
    return {
      ...item,
      ...(agent?.discount && !item?.discount_amount && { bonus: bonus }),
    };
  });


      setdisountedAmount( accBonus)

  return items;
}, [cartItems, agent]);


console.log(refindCartItems)


  const handleCheckout = () => {
    dispatch(createOrder(data))
      .then((result) => {
        if (createOrder.fulfilled.match(result)) {
          dispatch(emptyCart());
          navigate(`/confirm-order?orderId=${result.payload.data.id}`);
        } else if (createOrder.fulfilled.match(result)) {
          console.error(result.payload.message);
        }
      });
  };

  const paymentSteps = [
    {
      step: 0,
      render: <CreditForm setStep={setStep} billingDetails={billingDetails} setBillingDetails={setBillingDetails} />,
    },
    {
      step: 1,
      render: <PaymentMethod setStep={setStep} billingDetails={billingDetails} setBillingDetails={setBillingDetails} />,
    },
    {
      step: 2,
      render: <ConfirmPayment
      loading={loading} setStep={setStep} handleCheckout={handleCheckout} billingDetails={billingDetails} setBillingDetails={setBillingDetails} 
      cartItems={refindCartItems} total={total} />,
    },

  ];

  const steps = [
    'Delivery Info',
    'Select Payment process',
    'Confirm Payment',
  ];

  useEffect(() => {
    dispatch(getDeliveryFees());
  }, []);
  useEffect(() => {
    setBillingDetails({
      ...billingDetails,
      state: deliveryFees[0]?.state,
    });
  }, [deliveryFees]);
  useEffect(() => {
    dispatch(resetOrder());
  }, []);
  return (
    <>
      <Nav />
      <div className="max-w-5xl m-auto mt-10">

        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>

      <section className="px-4 lg:px-20 py-10">
        <div className="max-w-7xl rounded-3xl shadow bg-white py-5 px-4  w-full m-auto flex flex-col md:flex-row justify-center items-cente gap-5  my-2 md:my-5">
          <div className="checkout flex-1 bg-ligh  flex-col justify-between md:flex-row gap-10 max-w-[1500px] ">

            {paymentSteps.map(((item) => {
              if (item.step === step) {
                return item.render;
              }
            }
            ))}

          </div>
          <CheckoutSummary
            referal={referal}
            handleAgentFetch={handleAgentFetch}
            netTotal={netTotal}
            subTotal={subTotal}
            discount={agent?.discount}
            discountedAmount={discountedAmount}
            setReferal={setReferal}
            shippingFee={shippingFee}
            amount={total}
            counter={counter}
          />

        </div>

        <div />

      </section>

    </>

  );
};

export default Checkout;

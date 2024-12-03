import React from 'react';
import '../style.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DiscoverBtn from '../../buttons/DiscoverBtn';
import Button from '../../buttons/Button';

const PaymentMethod = ({ setStep, setBillingDetails, billingDetails }) => {
  const handlePaymentMethod = (e) => {
    const { name, value, checked } = e.target;
    setBillingDetails(
      {
        ...billingDetails,
        [name]: checked ? value : '',
      },
    );
  };

  return (
    <div className="">
      <div className="border mb-6 relative rounded-2xl border-theme md:px-3 py-4 md:py-8 gap-4 flex items-center">
        .
        <label htmlFor="delivery" className="absolute cursor-pointer top-0 left-0 w-full h-full" />
        <input type="radio" onChange={handlePaymentMethod} value="pay later" name="payment_method" id="delivery" className="border w-6 h-6   shrink-0 custom-checkbox" checked={billingDetails.payment_method == 'pay later' && true} />

        <div>
          <p className="py-0 font-semibold text-xl">Pay On Confirmation</p>
          <p>Our representative will contact you to confirm your order</p>

        </div>
      </div>
      <div className="border  my-6 relative rounded-2xl border-theme md:px-3  py-4 md:py-8 gap-4 flex items-center">
        .
        <label htmlFor="paystack" className="absolute cursor-pointer top-0 left-0 w-full h-full" />
        <input type="radio" disabled onChange={handlePaymentMethod} value="paystack" name="payment_method" id="paystack" className="border w-6 h-6  shrink-0 custom-checkbox" checked={billingDetails.payment_method == 'paystack' && true} />

        <div>
          <p className="py-0 font-semibold text-xl">Paystack</p>
          <p>Card, Bank Account, Bank Transfer, uSSD, Visa QR, Mobile Money</p>

        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button
          className="flex gap-2 flex-1"
          btnFunc={() => setStep((prev) => prev - 1)}
        >
          <FaArrowLeft />
          {' '}
          Previous
        </Button>

        <Button
          className="flex gap-2 flex-1"
          btnFunc={() => {
            billingDetails.payment_method && setStep((prev) => prev + 1);
          }}
        >
          Go to Confirmation
          <FaArrowRight />
        </Button>

      </div>

    </div>
  );
};

export default PaymentMethod;

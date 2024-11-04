import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PaystackButton } from 'react-paystack';
import { nairaFormat } from '../../../utils/nairaFormat';
import Button from '../../buttons/Button';
import Loader from '../../../pages/Loader';

const ConfirmPayment = ({
  billingDetails, loading, handleCheckout, cartItems, total, setStep,
}) => {
  const publicKey = 'pk_test_9ff293bee5b397191f0d59ea6bab4ff2bc6e2374';

  const componentProps = {
    email: billingDetails.email,
    amount: total * 100,
    metadata: {
      name: billingDetails.name,
      phoneNumber: billingDetails.email,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => {
      alert('Purchase successful');
      dispatch(clearCart());
    },
    onClose: () => alert('Are you sure'),
  };

  return (
    <div className="rounded-lg  bg-white">
      <div className="border p-4 my-4">
        <p className="text-base font-medium text-gray-500">Mode</p>
        <p className="text-lg capitalize">{billingDetails.payment_method}</p>
      </div>
      <div className="border rounded-lg p-4">
        <div>
          <p className="text-lg text-gray-500">Name</p>
          <p className="text-xl">{billingDetails.name}</p>
        </div>
        <div className="my-4">
          <p className="text-lg text-gray-500">Email</p>
          <p className="text-xl">{billingDetails.email}</p>
        </div>
        <div className="my-4">
          <p className="text-lg text-gray-500">Phone Number</p>
          <p className="text-xl">{billingDetails.phone_no}</p>
        </div>
        <div className="my-2">
          <p className="text-lg text-gray-500">Address</p>
          <p className="text-xl">
            {billingDetails.street}
            {' '}
            {billingDetails.city}
            {' '}
            {billingDetails.state}
          </p>
        </div>
      </div>

      <div className="my-4">
        <span className="text-lg uppercase">Items</span>
        {cartItems.map((item) => (
          <div className="flex justify-between border my-2 rounded-xl py-4 px-4 gap-3">
            <div className="w-16 h-16 border rounded p-1">
              <img src={item.image} alt="" className="w-full h-full object-contain" />

            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product_name}</p>
              <p>
                Quantity:
                {item.quantity}
              </p>

            </div>
            <div>
              <p className="text-base font-semibold">
                {nairaFormat(item.price)}
              </p>
            </div>

          </div>
        ))}

      </div>

      <div className="flex justify-between gap-6">
        <Button
          className="flex flex-1 gap-2"
          btnFunc={() => setStep((prev) => prev - 1)}
        >
          {' '}
          <FaArrowLeft />
          {' '}
          Previous
        </Button>

        {billingDetails.payment_method == 'pay later' ? (
          <Button
            className="flex gap-2 w-full text-center flex-1 justify-center"
            btnFunc={handleCheckout}
            disabled={loading}
          >
            {' '}
            {/* <Loader/> */}
            {loading ? (
              <>
                <svg aria-hidden="true" role="status" className="inline  w-4 h-4 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Loading...
              </>
            )
              : (
                <>
                  Place an Order

                </>
              )}

          </Button>
        )
          : <PaystackButton className="font-semibold  block max-w-xs w-full text-center py-3 px-3 border-2 border-dark" {...componentProps} />}

      </div>

    </div>
  );
};

export default ConfirmPayment;

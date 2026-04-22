import '../style.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
      <div className="space-y-4">

        {/* Pay Later */}
        <label
          htmlFor="delivery"
          className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition
    ${
      billingDetails.payment_method === 'on_delivery'
        ? 'border-green-500 bg-green-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}
        >
          <input
            type="radio"
            onChange={handlePaymentMethod}
            value="on_delivery"
            name="payment_method"
            id="delivery"
            className="mt-1 h-5 w-5  shrink-0 custom-checkbox accent-green-600"
            checked={billingDetails.payment_method === 'on_delivery'}
          />

          <div>
            <p className="font-semibold text-lg text-gray-800">
              Pay on Delivery
            </p>
            <p className="text-sm text-gray-500">
              Our representative will contact you to confirm your order
            </p>
          </div>
        </label>

        {/* Paystack */}
        <label
          htmlFor="paystack"
          className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition
    ${
      billingDetails.payment_method === 'paystack'
        ? 'border-indigo-500 bg-indigo-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}
        >
          <input
            type="radio"
            onChange={handlePaymentMethod}
            value="paystack"
            name="payment_method"
            id="paystack"
            className="mt-1 h-5 w-5 accent-indigo-600  shrink-0 custom-checkbox"
            checked={billingDetails.payment_method === 'paystack'}
          />

          <div className="">
            <p className="font-semibold text-lg text-gray-800">
              Paystack
            </p>
            <p className="text-sm text-gray-500">
              Card, Bank Account, Transfer, USSD, Visa QR, Mobile Money
            </p>
          </div>
        </label>

      </div>

      <div className="flex justify-between my-4 gap-3">
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

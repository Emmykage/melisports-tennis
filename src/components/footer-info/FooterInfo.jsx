import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import delivery from '../../assets/svgs/icon-delivery.svg';
import payment from '../../assets/svgs/icon-payment.svg';
import message from '../../assets/svgs/icon-mail.svg';
import returns from '../../assets/svgs/icon-returns.svg';

const FooterInfo = () => (
  <section className="mt-12 bg-gray-50 py-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mx-auto px-4">
      {/* Free Delivery */}
      <div className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <img src={delivery} alt="Free Delivery" className="w-12 h-12 mb-3" />
        <p className="text-base font-semibold text-gray-800">Free Delivery</p>
        <span className="text-sm text-gray-500">On orders over ₦300,000</span>
      </div>

      {/* Secured Payment */}
      <div className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <img src={payment} alt="Secured Payment" className="w-12 h-12 mb-3" />
        <p className="text-base font-semibold text-gray-800">Secured Payment</p>
        <span className="text-sm text-gray-500">Safe checkout guaranteed</span>
      </div>

      {/* Customer Service */}
      <div className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <CiMail className="text-4xl text-primary mb-3" />
        <p className="text-base font-semibold text-gray-800">Customer Service</p>
        <span className="text-sm text-gray-500">We’re here to help</span>
      </div>

      {/* Free Return */}
      <div className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
        <img src={returns} alt="Free Return" className="w-12 h-12 mb-3" />
        <p className="text-base font-semibold text-gray-800">Free Return</p>
        <span className="text-sm text-gray-500">Within 7 days</span>
      </div>
    </div>
  </section>

);

export default FooterInfo;

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import delivery from '../../assets/svgs/icon-delivery.svg';
import payment from '../../assets/svgs/icon-payment.svg';
import message from '../../assets/svgs/icon-mail.svg';
import returns from '../../assets/svgs/icon-returns.svg';

const FooterInfo = () => (
  <section className="mt-10">
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-info-bottom">
      <div className="md:border flex flex-col justify-center items-center md:shadow py-6 text-center">
        <img src={delivery} alt="" />
        <p className="text-base font-medium">Free Delivery over NGN300000</p>

      </div>
      <div className="md:border flex flex-col justify-center items-center md:shadow py-6 text-center">
        <img src={payment} alt="" />
        <p className="text-base font-medium">Secured Payment</p>

      </div>
      <div className="md:border flex flex-col justify-center items-center md:shadow py-6 text-center">
        {/* <img src={message} alt="" />  */}
        <CiMail className="text-3xl" />

        <p className="text-base font-medium">Customer Service</p>

      </div>
      <div className="md:border flex flex-col justify-center items-center md:shadow py-6 text-center">
        <img src={returns} alt="" />
        <p className="text-base font-medium">Free Return</p>

      </div>

    </div>
  </section>
);

export default FooterInfo;

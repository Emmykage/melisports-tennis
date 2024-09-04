import React from 'react';
import { NavLink } from 'react-router-dom';

const ShippingPolicy = () => (
  <div className="portra gap-20 flex max-w-7xl bg--200 m-auto px-4">
    {/* <div className="w-56 shadow py-40 h-screen border">
      <ul className="">
        <li className="hover:shadow ">
          <NavLink to="/return_policy" className="block  py-5 w-full px-4 bg-gray-50">
            <p>What is our return Policy</p>
          </NavLink>

        </li>
      </ul>

    </div> */}

    <div className="py-16 lg:px-5  max-w-4xl bg-red-">
      <h2 className="text-3xl font">
        Shipping Policy
      </h2>

      <p className="my-4 text-base px-4">
        At Melisports, we strive to deliver your orders promptly and efficiently. We have partnered with reputable shipping providers to ensure reliable and fast delivery. Please find our shipping details below:

      </p>

      <h3 className="text-lg">
        Shipping Methods
      </h3>
      <ul className="text-base px-4">
        <li>
          - Standard Shipping: 0-7 business days
        </li>
        <li>
          - Express Shipping (Lagos): 1 business days

        </li>

      </ul>

      <h3 className="my-3 text-lg">
        Shipping Providers

      </h3>

      <ul className="list-inside text-base list-disc px-4 leading-7">
        <li className="px-">
           Uber Logistics

        </li>
        <li>
          GIG Logistics

        </li>
        <li>
           Konga Express

        </li>

      </ul>
      <h3 className="text-lg my-3">
        Shipping Rates
      </h3>
      <ul className="leading-7 px-4 text-base">
        <li>
          - Lagos & Abuja Location: ₦4,000

        </li>
        <li>
          - Express (Lagos): ₦5,000

        </li>
        <li>
          - Other State Location Shipping: ₦6,000 - ₦10,000

        </li>
      </ul>

      <h3 className="text-lg my-3">
        Delivery Areas

      </h3>
      <p className="text-base leading-7 px-4">
        We ship to all states in Nigeria and some international destinations. If your area is not listed, please contact us for a custom quote.

      </p>

      <h3 className="text-lg">
        Order Processing

      </h3>

      <ul className="leading-7 text-base px-4">
        <li>
          - Orders are processed within 24-48 hours of receipt.

        </li>
        <li>
          - Orders placed on weekends or holidays will be processed the next business day.

        </li>

      </ul>

      <h3 className="text-lg my-3">
        Tracking

      </h3>
      <ul className="text-base leading-7 px-4">
        <li>
          - Once shipped, you will receive tracking information via email.

        </li>
        <li>
          - Use this to track the status of your order.
        </li>

      </ul>

      <h3 className="text-lg my-3">
        Delivery Issues

      </h3>
      <ul className="text-base leading-7 px-4">
        <li>
          - If your order is lost, damaged, or delayed, please contact us within 3 days.

        </li>
        <li>
          - We will work with you to resolve the issue promptly.

        </li>
      </ul>

      <h3 className="text-lg my-3">Return Shipping</h3>
      <ul className="px-4 text-base ">
        <li>
          - For returns, please see our Return Policy
          {' '}
        </li>

        <li>- Customized or personalized items</li>
        <li>
          - Return shipping is the responsibility of the customer unless otherwise agreed upon.
        </li>
      </ul>

      <h3 className="text-lg my-3">International Shipping Notes </h3>
      <ul className="px-4 text-base ">
        <li>
          - International orders may incur additional fees, duties, or taxes.
        </li>

        <li>
          - Please check with your local authorities for more information.

        </li>
        <li>
          - Please check with your local authorities for more information.

        </li>
      </ul>

      <h3 className="font-bold text-base  text-gray-600 my-3">
        Contact Us

      </h3>

      <p className="text-gray-600">
        If you have any shipping-related questions or concerns, please don't hesitate to contact us at <a className='text-blue-700' href='mailto:Info@melisports.com'>Info@melisports.com </a>

      </p>

      <h3 className="text-lg my-3">
        Changes to Shipping Policy

      </h3>
      <p className="leading-7 text-base ">
        We reserve the right to modify this shipping policy at any time. Please check this page for updates.

      </p>

      <p className="text-sm">
        By placing an order, you agree to our shipping policy. Thank you for shopping at Melisports!
      </p>

    </div>

  </div>

);

export default ShippingPolicy;

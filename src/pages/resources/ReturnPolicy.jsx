import React from 'react';
import { NavLink } from 'react-router-dom';

const ReturnPolicy = () => (
  <div className="portra gap-20 flex max-w-7xl m-auto px-4">
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
      <h2 className="text-3xl font">What is Our Retun Policy</h2>

      <p className="my-4 text-base">
        At Melisports, we want you to be completely satisfied with your purchase. If for any reason you're not, we offer a flexible return policy.

      </p>

      <h3 className="text-lg">Eligibility for Returns</h3>
      <ul className="text-base">
        <li>- Items must be returned within 7 days of delivery    </li>
        <li>
          -  Items must be in their original condition with all tags attached
        </li>
        <li>- Items must not have been worn, used, or altered in any way    </li>
      </ul>

      <h3 className="my-3 text-lg">
        Return Procedure

      </h3>

      <ul className="list-inside text-base list-disc px-4 leading-7">
        <li className="px-">
          <span className="inline-blo">

            Contact us via
            {' '}
            <a href="mailto:support@melisports.com" className="text-blue-700">email </a>
            (support@melisports.com) or phone (+234 703 872 3093) to initiate the return process
          </span>

        </li>
        <li>
          Provide your order number and reason for return

        </li>
        <li>
          We will issue a Return Merchandise Authorization (RMA) number
        </li>
        <li>
          Ship the item back to us with the RMA number included

        </li>
        <li>
          Once received, we will process a refund or exchange within 5-7 business days

        </li>

      </ul>
      <h3 className="text-lg my-3">Refunds</h3>
      <ul className="leading-7 px-4 text-base leading-7">
        <li>
          - Refunds will be issued in the original payment method

        </li>
        <li>
          - Refunds will be processed within 5-7 business days of receiving the returned item

        </li>
        <li>
          - Refunds will include the full amount paid for the item, minus any shipping costs

        </li>
      </ul>

      <h3 className="text-lg my-3">
        Exchanges

      </h3>

      <ul className="leading-7 text-base px-4">
        <li>
          - Exchanges are only available for the same item in a different size or color

        </li>
        <li>
          - Exchanges will be processed within 5-7 business days of receiving the returned item

        </li>
        <li>
          - Customer is responsible for return shipping costs

        </li>
      </ul>

      <p className="font-bold text-base  text-gray-600 my-3">
        Items Not Eligible for Returns

      </p>
      <ul className="px-4 text-base ">
        <li>- Final sale items</li>
        <li>- Customized or personalized items</li>
        <li>- Items damaged or altered by the customer</li>
      </ul>

      <h3 className="text-lg my-3">
        Damaged or Defective Items

      </h3>
      <ul className="px-4 text-base leading-7">
        <li>
          - If you receive a damaged or defective item, please contact us within 3 days

        </li>
        <li>
          - We will provide a replacement or refund, including return shipping costs

        </li>

      </ul>

      <h3 className="text-lg my-3">
        Changes to Return Policy

      </h3>
      <p className="leading-7 text-base ">
        We reserve the right to modify this return policy at any time. Please check this page for updates.

        By placing an order, you agree to our return policy. Thank you for shopping at Melisports!

      </p>

    </div>

    {/* <div>

    <h2 className="my-3">
      Return Policy
    </h2>

    At Melisports, we want you to be completely satisfied with your purchase. We understand that sometimes you may need to return or exchange an item. This Return Policy outlines our guidelines and procedures to ensure a smooth and hassle-free return process.

    Eligibility for Returns:

    We accept returns within 7 days from the date of delivery.
    To be eligible for a return, the item must be unused, in its original condition, and with all tags, labels, and packaging intact.
    Certain items, such as personalized or customized products, undergarments, and swimwear, are non-returnable for hygiene reasons.
    Return Process:

    To initiate a return, please contact our customer support team within the specified return period. You can reach us through [email/phone number] or by visiting our website's "Contact Us" page.
    Provide the order number, item(s) you wish to return, and the reason for the return.
    Our customer support team will guide you through the return process and provide you with a Return Merchandise Authorization (RMA) number.
    Pack the item securely, including all original accessories and documents, and clearly mark the RMA number on the package.
    Return Shipping:

    The customer is responsible for the shipping costs associated with returning the item unless the return is due to our error (e.g., wrong item shipped or defective product).
    We recommend using a trackable shipping method to ensure the safe and timely arrival of the returned item.
    Inspection and Refunds:

    Once we receive the returned item, our team will inspect it to ensure it meets the eligibility criteria mentioned above.
    If the item is approved for return, we will process your refund within [X] business days.
    The refund will be issued to the original payment method used for the purchase, unless otherwise specified by the customer.
    Please note that it may take additional time for the refunded amount to appear in your account, depending on your bank or credit card provider.
    Exchanges:

    If you wish to exchange an item for a different size, color, or style, please contact our customer support team to check for availability.
    Once the availability is confirmed, follow the return process mentioned above for the original item.
    We will process the exchange and ship the new item once the returned item is received and inspected.
    Damaged or Defective Items:

    In case you receive a damaged or defective item, please contact our customer support team immediately.
    Provide a clear description and, if possible, attach supporting photographs of the damaged or defective area.
    We will resolve the issue by offering a replacement, repair, or refund, depending on the circumstances and product availability.
    Store Credit:

    In some cases, we may offer store credit instead of a refund.
    Store credit can be used towards future purchases on our website and is valid for a specified period.
    Please note that this Return Policy is subject to change without prior notice. We recommend reviewing this policy each time before making a purchase. For more detailed information or any questions regarding our return process, please contact our customer support team.

    Melisports reserves the right to make the final decision on all return and exchange requests, taking into account the guidelines outlined in this policy.
  </div> */}

  </div>

);

export default ReturnPolicy;

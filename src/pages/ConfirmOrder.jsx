import React, { useEffect, useRef } from "react";

import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { nairaFormat } from "../utils/nairaFormat";
import CheckoutSummary from "../components/checkoutSummary/CheckoutSummary";
import { getOrder } from "../redux/actions/orders";
import DiscoverBtn from "../components/buttons/AppButton";
import resetPageLoction from "../hooks/resetPageLoction";
import Loader from "./Loader";
import Nav from "../components/nav/Nav";
import Container from "../components/container";
import Header from "../components/header/Header";
import { useReactToPrint } from "react-to-print";

const ConfirmOrder = () => {
  const invoiceRef = useRef(); // 👈 THIS is what we print

  const [query] = useSearchParams();
  const orderId = query.get("orderId");
  const dispatch = useDispatch();
  const { order, status, loading } = useSelector((state) => state.orders);
  resetPageLoction();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const totalQnty = order?.order_items?.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
  const referal = order?.referral_code;
  const netTotal = Number(order?.net_total);
  const subTotal = Number(order?.sub_total);
  const deliveryFee = Number(order?.delivery_fee);
  const total = order?.total_amount ?? Number(order?.total);
  const counter = totalQnty;
  const discountedAmount = total - subTotal;

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });

  const cpayment =
    order.payment_method === "on_delivery" ? "Pay on Delivery" : "Paystack";

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Container>
        <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
          <div id="invoice" className="max-w-6xl mx-auto">
            {/* Success Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl">
                <FaCheck />
              </div>

              <h1 className="mt-5 text-3xl font-normal text-gray-900">
                Order Confirmed!
              </h1>

              <p className="mt-2 text-gray-500">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="
          flex items-center gap-2
          px-5 py-3
          rounded-xl
          bg-gray-900
          text-white
          hover:bg-gray-800
          transition
          "
                >
                  Print Order
                </button>

                {/* <button
                  className="
          px-5 py-3
          rounded-xl
          border border-gray-200
          text-gray-700
          hover:bg-gray-50
          transition
          "
                >
                  Download Invoice
                </button> */}
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Invoice Number
                <span className="font-semibold text-gray-900 ml-2">
                  #{order?.order_number}
                </span>
              </div>
            </div>

            <div ref={invoiceRef} className="grid lg:grid-cols-3 gap-6">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-lg font-normal text-gray-900 mb-5">
                    Customer Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Info label="Name" value={order?.billing_address?.name} />

                    <Info label="Email" value={order?.billing_address?.email} />

                    <Info
                      label="Phone"
                      value={order?.billing_address?.phone_no}
                    />

                    <Info
                      label="Address"
                      value={`${order?.billing_address?.street}, ${order?.billing_address?.city}, ${order?.billing_address?.state}`}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">
                    Order Items
                  </h2>

                  <div className="space-y-4">
                    {order?.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="
              flex gap-4
              p-4
              rounded-xl
              bg-gray-50
              "
                      >
                        <img
                          src={item?.photo_url || item?.product?.image}
                          alt={item?.product?.name}
                          className="
                w-20 h-20
                rounded-lg
                object-contain
                bg-white
                "
                        />

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item?.product?.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="font-semibold text-gray-900">
                          {nairaFormat(item?.product?.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <CheckoutSummary
                  referal={referal}
                  netTotal={netTotal}
                  subTotal={subTotal}
                  amount={total}
                  shippingFee={deliveryFee}
                  counter={counter}
                  discount={!!referal}
                  discountedAmount={discountedAmount}
                />

                <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-5">
                  <p className="text-sm text-gray-500">Payment Method</p>

                  <p className="font-semibold text-gray-900 mt-1">{cpayment}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>

    <p className="mt-1 font-medium text-gray-900">{value}</p>
  </div>
);
export default ConfirmOrder;

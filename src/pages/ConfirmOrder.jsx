import React, { useEffect } from 'react';

import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { nairaFormat } from '../utils/nairaFormat';
import CheckoutSummary from '../components/checkoutSummary/CheckoutSummary';
import { getOrder } from '../redux/actions/orders';
import DiscoverBtn from '../components/buttons/AppButton';
import resetPageLoction from '../hooks/resetPageLoction';
import Loader from './Loader';
import Nav from '../components/nav/Nav';
import Container from '../components/container';
import Header from '../components/header/Header';

const ConfirmOrder = () => {
  const [query] = useSearchParams();
  const orderId = query.get('orderId');
  const dispatch = useDispatch();
  const { order, status, loading } = useSelector((state) => state.orders);
  resetPageLoction();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  if (loading) {
    return (<Loader />);
  }

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
  const cpayment = order.payment_method === 'on_delivery' ? 'Pay on Delivery' : 'Paystack';

  return (
    <>

      <Container>

        <section className="py-10 px-4 sm:px-8 lg:px-12 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

            {/* LEFT: Invoice */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">

              {/* Header */}
              <div>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice
                  {' '}
                  <span className="text-gray-500">
                    #
                    {order?.order_number}
                  </span>
                </p>
              </div>

              {/* Success Alert */}
              {status === 'success' && (
              <div className="flex items-center gap-3 p-4 rounded-lg border border-green-200 bg-green-50">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                  <FaCheck />
                </span>
                <p className="text-sm font-medium text-green-700">
                  Order placed successfully
                </p>
              </div>
              )}

              {/* Payment */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-lg font-medium capitalize text-gray-800">
                  {cpayment}
                </p>
              </div>

              {/* Customer Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-base font-medium text-gray-800">
                    {order?.billing_address?.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{order?.billing_address?.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{order?.billing_address?.phone_no}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="leading-relaxed">
                    {order?.billing_address?.street}
                    ,
                    {' '}
                    {order?.billing_address?.city}
                    ,
                    {' '}
                    {order?.billing_address?.state}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Delivery Fee</p>
                  <p className="font-medium">
                    {nairaFormat(order?.delivery_fee)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Items
                </h3>

                <div className="space-y-4">
                  {order?.order_items?.length > 0 ? (
                    order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border rounded-md p-1 bg-gray-50">
                          <img
                            src={item?.photo_url || item?.product?.image}
                            alt={item?.product?.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {item?.product?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty:
                            {' '}
                            {item?.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right font-semibold text-gray-900">
                          {nairaFormat(item?.product?.price)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No items</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4">
                <DiscoverBtn
                  className="w-full justify-center"
                  link="/"
                  btnText="Back to Home"
                />
              </div>
            </div>

            {/* RIGHT: Summary */}
            <div className="w-full lg:max-w-sm">
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
            </div>

          </div>
        </section>
      </Container>

    </>

  );
};

export default ConfirmOrder;

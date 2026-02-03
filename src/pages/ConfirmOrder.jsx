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
  const discount = order?.discount || referal;

  console.log(discountedAmount);

  return (
    <>
      <Nav />
      <Container>

        <section className="py-10 px-4 sm:px-10 ">

          <div className="flex m-auto max-w-7xl gap-5 flex-col md:flex-row">

            <div className="flex-1 p-5 rounded-lg py-10  bg-white">
              <div>
                <p className="uppercase text-xl md:text-3xl">
                  <span>Invoice </span>
                  {' '}
                  : #
                  {order?.invoice_number}
                </p>
              </div>

              {
            status === 'success' && (
            <div className="border border-green-600 flex px-4 py-6 items-center gap-4 rounded bg-green-100/60">
              <span className="w-6 h-6 rounded-full flex justify-center items-center bg-green-300/70 border border-green-600"><FaCheck className="text-green-700" /></span>
              {' '}
              Order Placed Successfully

            </div>
            )
}

              <div className="border p-4 my-4">
                <p className="text-base font-medium text-gray-500">Mode</p>
                <p className="text-lg capitalize">{order?.payment_method}</p>
              </div>
              <div className="border rounded-lg p-4">
                <div>
                  <p className="text-lg text-gray-500">Name</p>
                  <p className="text-xl">{order?.billing_address?.name}</p>
                </div>
                <div className="my-4">
                  <p className="text-lg text-gray-500">Email</p>
                  <p className="text-xl">{order?.billing_address?.email}</p>
                </div>
                <div className="my-4">
                  <p className="text-lg text-gray-500">Phone Number</p>
                  <p className="text-xl">{order?.billing_address?.phone_no}</p>
                </div>
                <div className="my-2">
                  <p className="text-lg text-gray-500">Address</p>
                  <p className="text-xl">
                    {order?.billing_address?.street}
                    {' '}
                    {order?.billing_address?.city}
                    {' '}
                    {order?.billing_address?.state}
                  </p>
                </div>
                <div className="my-4">
                  <p className="text-lg text-gray-500">Delivery Fee</p>
                  <p className="text-xl">{nairaFormat(order?.delivery_fee)}</p>
                </div>
              </div>

              <div className="my-4">
                <span className="text-lg uppercase">Items</span>
                {Object.keys(order)?.length > 0 ? order?.order_items?.map((item) => (
                  <div className="flex justify-between border my-2 rounded-xl py-4 px-4 gap-3">
                    <div className="w-16 h-16 border rounded p-1">
                      <img src={item?.photo_url ? item?.photo_url : item?.product?.image} alt="" className="w-full h-full object-contain" />

                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item?.product?.name}</p>
                      <p>
                        Quantity:
                      {item?.quantity}
                      </p>

                    </div>
                    <div>
                      <p className="text-base font-semibold">
                        {nairaFormat(item?.product?.price)}
                      </p>
                    </div>

                  </div>
                )) : <h2>No Items</h2>}

              </div>

              <div className="flex justify-between">

                <DiscoverBtn
                  className="flex gap-2 w-full text-center justify-center"
                  link="/"
                  btnText="Back to Home"
                >
                  {' '}
                </DiscoverBtn>

              </div>

            </div>
            {/* {order?.delivery_fee} */}
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

        </section>
      </Container>

    </>

  );
};

export default ConfirmOrder;

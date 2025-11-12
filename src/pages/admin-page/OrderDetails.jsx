import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ClickButton from '../../components/buttons/ClickButton';
import { createInvoice, getOrder, updateOrder } from '../../redux/actions/orders';
import { nairaFormat } from '../../utils/nairaFormat';
import DiscoverBtn from '../../components/buttons/DiscoverBtn';
import Loader from '../Loader';
import Confirmation from '../../components/modal/Confirmation';
import localDate from '../../utils/dateFormat.js';
import { getStatistics } from '../../redux/actions/statistics.js';
import Invoice from '../../components/invoice/Invoice.jsx';
import AppModal from '../../components/modal/AppModal.jsx';
import { closeLoader, setLoader } from '../../redux/app/app.js';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contRef = useRef();
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const { order, loading } = useSelector((state) => state.orders);
  // const { invoice, invoices } = useSelector((state) => state.invoices);
  const [openInvoice, setOpenInvoice] = useState(false);

  const handleUpdate = (status) => {
    dispatch(setLoader(true));

    dispatch(updateOrder({ id, order_detail: { status } })).unwrap()
      .then((result) => {
        dispatch(getOrder(id));
        toast(result?.message ?? 'order confirmed', { type: 'success' });

        setOpenDecline(false);
        setOpenAccept(false);
      }).catch((err) => {
        toast(err?.message, { type: 'error' });
      })
      .finally(() => { dispatch(closeLoader(false)); });
  };

  const handleInvoiceGeneration = () => {
    dispatch(setLoader(true));
    dispatch(createInvoice({
      invoice: {
        order_detail_id: id,
      },
    })).unwrap()
      .then((res) => {
        dispatch(closeLoader());
        dispatch(getOrder(id));
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !order?.viewed) {
        dispatch(updateOrder({ id, data: { viewed: true } })).then((result) => {
          if (updateOrder.fulfilled.match(result)) {
            dispatch(getStatistics());
          }
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });

    if (contRef.current) {
      observer.observe(contRef.current);
    }
    return () => {
      if (contRef.current) {
        observer.unobserve(contRef.current);
      }
    };
  }, [order?.viewed]);

  return (
    <>
      <div className="bg-white p-6" ref={contRef}>

        <div className="flex">
          <span onClick={() => navigate(-1)} className="mr-4 border cursor-pointer border-gray-400 h-10 shadow w-12 rounded flex justify-center items-center"><MdOutlineKeyboardBackspace className="text-2xl" /></span>
          <div>
            <p className="text-green-700 text-xs">Order/Order details</p>
            <p className="text-xl font-semibold text-gray-800">
              Order#
              {order?.order_number}
            </p>

          </div>
        </div>
        <div className="pb-7 pt-5  px-5 my-7 rounded-xl border border-gray-300">

          <div className=" flex flex-col lg:flex-row ">
            <div className="flex-1">

              <p className="text-2xl my-3 text-gray-800 font-semibold">
                Order #
                {order?.order_number}
              </p>
              {order?.status == 'pending' ? <span className="bg-orange-200 px-4 py-1 text-orange-800 font-medium rounded"> awaiting confirmation</span> : order?.status == 'declined' ? <span className="bg-red-200 px-4 py-1 text-red-800 font-medium rounded">Order Rejected </span> : <span className="bg-blue-200 px-4 py-1 text-blue-800 font-medium rounded"> Ready to ship</span>}
              <div className="flex flex-col md:flex-row gap-7 my-5">

                <span className="bg-gray-300 px-2 py-1 rounded-lg text-xs">
                  ordered:
                  {' '}
                  {localDate(order?.created_at)}
                </span>
                <span className="bg-gray-300 px-2 py-1 rounded-lg text-xs">
                  paid on: 2024-02-13
                </span>
                <span className="bg-gray-300 px-2 py-1 rounded-lg text-xs">
                  paid on: 2024-02-13
                </span>

              </div>
            </div>
            <div className="flex gap-3 max-w-[280px]  w-full">
              <span className="p-2 border border-gray-300 h-max rounded-lg ">More</span>
              <span className="p-2 bg-green-600 h-max text-white rounded-lg font-medium">Create shippin Label</span>

            </div>
          </div>

          <div className="flex justify-end">

            <span className={` ${order?.status == 'pending' ? 'bg-orange-200 text-orange-800' : order?.status == 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-red-200  text-red-800'}  px-3 py-1 text-sm"`}>
              {order?.status}

            </span>
          </div>

        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 border-gray-300">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-700">CUSTOMER & ORDER</p>
              <ClickButton onCLick={() => {}}>Edit</ClickButton>

            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between">
                <span className="flex-1 font-medium">Name:</span>
                <span className="flex-1">{order?.billing_address?.name}</span>
              </div>
              <div className="flex flex-col md:flex-row flex-wrap justify-between gap-1 my-2">
                <span className="flex-1 font-semibold  text-gray-600">Email:</span>
                <span className="flex-1  ">
                  {' '}
                  {order?.billing_address?.email}
                </span>
              </div>
              <div className="flex justify-between my-2  text-gray-500 flex-col md:flex-row">
                <span className="flex-1 font-semibold  text-gray-600">Phone:</span>
                <span className="flex-1">{order?.billing_address?.phone_no}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between my-2">
                <span className="flex-1 font-semibold  text-gray-600">Payment Method:</span>
                <span className="flex-1 uppercase">
                  {' '}
                  {order?.payment_method}
                </span>
              </div>
              <div className="flex justify-between flex-col md:flex-row my-2">
                <span className="flex-1 flex-col md:flex-row font-semibold text-gray-600">Delivery Method:</span>
                <span className="flex-1"> Shipping</span>
              </div>
            </div>

          </div>
          <div className="border rounded-lg p-4 border-gray-300">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-700">SHIPPING ADDRESS</p>
              <ClickButton onCLick={() => {}}>Edit</ClickButton>

            </div>
            <div>
              {order?.billing_address?.street}
              {' '}
              {order?.billing_address?.city}
              {' '}
              {order?.billing_address?.atate}
            </div>

          </div>
          <div className="border rounded-lg p-4 border-gray-300">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-700">SHIPPING ADDRESS</p>
              <ClickButton onCLick={() => {}}>Edit</ClickButton>

            </div>
            <div>
              {order?.billing_address?.street}
              {' '}
              {order?.billing_address?.city}
              {' '}
              {order?.billing_address?.atate}

            </div>

          </div>
        </div>

        <div className="my-8">
          <div className="flex justify-between">
            <p className="font-semibold text-sm">Items Ordered</p>
            {/* <ClickButton>Edit</ClickButton> */}
          </div>
          <div className=" overflow-x-auto no-scroll">

            {loading ? <Loader />
              : (
                <table className="my-4">
                  <thead>
                    <tr>
                      <th />
                      <th>Item Name</th>
                      <th>SKU</th>
                      <th>Code</th>
                      <th>Quantity</th>
                      <th>price</th>
                      <th>total</th>

                    </tr>
                  </thead>
                  <tbody>
                    {order?.order_items?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {' '}
                          <img src={item.photo_url} alt={item.product.name} className="w-20 h-20" />
                        </td>
                        <td>{item.product.name}</td>
                        <td>{item.product.sku}</td>
                        {/* <td>{item.billing_address.city}</td> */}
                        <td>{item.product.ms_code}</td>
                        <td>{item.quantity}</td>
                        <td className="font-semibold text-gray-500">{nairaFormat(item.amount)}</td>
                        <td className="text-gray-600 font-semibold">{nairaFormat(item.amount * item.quantity)}</td>

                      </tr>

                    ))}
                    <tr>
                      <td>
                        {' '}
                        <span>Shipping</span>
                      </td>
                      <td />

                      <td />
                      <td />
                      {' '}
                      <td />
                      <td />
                      <td>
                        {' '}
                        <span>{nairaFormat(order?.delivery_fee ?? 0)}</span>
                      </td>

                    </tr>
                    <tr>
                      <td>
                        {' '}
                        <span>Total</span>
                      </td>
                      <td />
                      <td />

                      <td />
                      {' '}
                      <td />
                      <td />
                      <td>
                        {' '}
                        <span className="text-xl font-bold text-gray-800">{ nairaFormat(parseInt(order?.net_total))}</span>
                      </td>

                    </tr>
                  </tbody>
                </table>
              ) }

          </div>

          <div>
            Currency NGN
          </div>

        </div>
        <div className="my-8 overflow-x-auto no-scroll">
          <div className="flex justify-between">
            <p className="font-semibold text-sm">Invoices </p>
            {order?.invoice ? (
              <ClickButton

                onClick={() => setOpenInvoice(true)}
              >
                View Invoice
              </ClickButton>
            ) : (
              <ClickButton
                disabled={!!order?.invoice}
                onClick={handleInvoiceGeneration}
              >
                Generate Invoice
              </ClickButton>
            )}
          </div>

          <div className=" overflow-x-auto no-scroll">
            <table className="my-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Amount</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>

                </tr>
              </thead>
              <tbody>
                <tr />

                <tr>
                  <td>Shipping</td>
                  <td />
                  <td />
                  <td />

                  <td>--</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td />
                  <td />
                  <td />
                  <td>--</td>
                </tr>
                <div>
                  Currency NGN
                </div>
              </tbody>
            </table>
          </div>

        </div>
        <div className="flex justify-between">
          <DiscoverBtn type="cancel" btnText="Decline Order" onclick={() => setOpen(true)} />

          <DiscoverBtn btnText="Confirm Order" onclick={() => setOpenAccept(true)} />
        </div>

        <Confirmation open={openAccept} cnlAction={() => { setOpenAccept(false); }} btnAction={() => { handleUpdate('confirmed'); }} />
        <Confirmation open={openDecline} cnlAction={() => { setOpenDecline(false); }} btnAction={() => { handleUpdate('confirmed'); }}>Confrim Reject Order</Confirmation>

      </div>
      <AppModal open={openInvoice} onClose={() => setOpenInvoice(false)}>
        <Invoice id={order?.invoice?.id} />

        <button
          className="bg-gray-200 px-4 py-2 mt-10 rounded-lg"
          onClick={() => setOpenInvoice(false)}
        >
          {' '}
          Close
          {' '}
        </button>
        <Confirmation open={openDecline} cnlAction={() => { setOpenDecline(false); }} btnAction={() => { handleUpdate('confirmed'); }}>Confrim Reject Order</Confirmation>

      </AppModal>
    </>
  );
};

export default OrderDetails;

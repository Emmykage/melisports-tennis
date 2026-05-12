import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getInvoice } from '../../redux/actions/orders';
import Loader from '../../pages/Loader';
import { nairaFormat } from '../../utils/nairaFormat';
import localDateString from '../../utils/dateString';

import logo from '../../assets/images/logo/melisport_3.png';
import babolatLogo from '../../assets/images/logo/babolat-logo.png';

const Invoice = ({ id }) => {
  const dispatch = useDispatch();
  const { invoice, loading } = useSelector((state) => state.invoices);
  const invoiceRef = useRef(); // 👈 THIS is what we print

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });
  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  return (
    <div className="relative ">

      <div ref={invoiceRef} className="max-w-5xl mx-auto  overflow-auto bg-white rounded-2xl shadow-lg p-4">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-6">
          <div>
            <img src={logo} alt="logo" className="h-12" />
            <p className="text-sm text-gray-500 mt-2">Premium Sports Store</p>
          </div>
          <img src={babolatLogo} alt="brand" className="h-10" />
        </div>

        {/* TITLE */}
        <div className="flex justify-between items-center mt-3">
          <h1 className="text-3xl font-bold text-primary">Invoice</h1>
          <div className="text-right text-sm text-gray-600">
            <p>
              <span className="font-semibold">Invoice No:</span>
              {' '}
              {invoice?.invoice_number}
            </p>
            <p>
              <span className="font-semibold">Date:</span>
              {' '}
              {localDateString(invoice?.created_at)}
            </p>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Billed To</p>
            <h3 className="font-semibold text-lg mt-1">
              {invoice?.order_detail?.billing_address?.name}
            </h3>
            <p className="text-gray-600">
              {invoice?.order_detail?.billing_address?.state}
            </p>
          </div>

          <div className="bg-primary/5 p-4 rounded-xl text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <h2 className="text-2xl font-bold text-primary">
              {nairaFormat(invoice?.order_detail?.net_total)}
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-4 overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {invoice?.order_items?.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium capitalize">{item?.product?.name}</p>
                  </td>
                  <td className="p-4 text-gray-500">
                    {item?.product?.ms_item_code}
                  </td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-right">
                    {nairaFormat(item?.amount)}
                  </td>
                  <td className="p-4 text-right font-semibold">
                    {nairaFormat(item?.amount * item?.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="mt-8 flex justify-end">
          <div className="flex justify-end mb-0 flex-1 print:hidden sticky top-0 right-0 z-50">
            <button
          // onClick={()=> window.print()}
              className="bg-primary text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
              onClick={handlePrint}
            >
              Print Invoice
            </button>
          </div>
          <div className="w-full max-w-sm bg-gray-50 rounded-xl p-6">

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>{nairaFormat(invoice?.order_detail?.sub_total)}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Delivery</span>
              <span>{nairaFormat(invoice?.order_detail?.delivery_fee)}</span>
            </div>

            <div className="border-t my-3" />

            <div className="flex justify-between text-lg font-bold text-primary">
              <span>Total</span>
              <span>{nairaFormat(invoice?.order_detail?.net_total)}</span>
            </div>
          </div>
        </div>
        <p className="text-sm my-4 text-gray-600">MELI BUSINESS COMPANY LIMITED,  PROVIDUSBANK. Account Number is 5400590339</p>

        {/* FOOTER */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-500 flex justify-between">
          <div>
            <p>1 Kandi Close, Wuse 2 Abuja, Nigeria</p>
            <p>+2348123111983</p>
            <p>melisports1@gmail.com</p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-primary">Thank you for your patronage</p>
            <p>www.melisports.com</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Invoice;

import React, { useEffect } from 'react';
import { MdEmail, MdLocationPin, MdOutlineMailOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaFacebook, FaLocationDot, FaPhone, FaTwitter,
} from 'react-icons/fa6';
import { TiWorldOutline } from 'react-icons/ti';
import { FaInstagramSquare } from 'react-icons/fa';
import logo from '../../assets/images/logo/melisport_3.png';
import babolatLogo from '../../assets/images/logo/babolat-logo.png';
import { nairaFormat } from '../../utils/nairaFormat';
import { getInvoice } from '../../redux/actions/orders';
import Loader from '../../pages/Loader';
import localDateString from '../../utils/dateString';

const Invoice = ({
  id,
}) => {
  const dispatch = useDispatch();
  const { invoice, loading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(getInvoice(id));
  }, []);
  console.log(invoice, id);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (

    <div>

      <div className="max-w-5xl m-auto mt-10 px-4">
        <div>
          <img src={logo} alt="logo" className="h-20" />

        </div>
        <div className="flex items-center">

          <div className="bg-theme-alt h-10 flex flex-1 justify-center">
            <h3 className="text-xl font-normal text-primary px-4 h-full leading-8 bg-white">Invoice</h3>

          </div>
          <img src={babolatLogo} className="w-20" />
        </div>

        <div className="flex justify-between my-4">
          <div className="border p-3 rounded">
            <span>Invoice To:</span>
            <p>{invoice?.order_detail?.billing_address?.name}</p>
            <p>
              {' '}
              {invoice?.order_detail?.billing_address?.state}
            </p>
          </div>
          <div className="">
            <p>
              {' '}
              <span className="font-semibold"> Invoice No: </span>
              {' '}
              {invoice?.invoice_number}
            </p>
            <p>
              {' '}
              <span className="font-semibold"> Date Issued:  </span>
              {' '}
              {localDateString(invoice?.created_at)}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto bg-gray-300">

          <table className="w-full">
            <thead>
              <th className="bg-orange-800 p-3 text-white">
                SN
              </th>
              <th className="bg-orange-800">ITEM</th>

              <th className="bg-orange-800">ITEM CODE</th>
              {/* <th className='bg-orange-800'>COLOUR</th> */}
              <th className="bg-orange-800">QTY</th>
              <th className="bg-orange-800">UNIT PRIZE</th>
              <th className="bg-orange-800">TOTAL PRICE</th>

            </thead>

            <tbody>
              {invoice?.order_items?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>

                  <td className="px-3">{item?.product?.name}</td>
                  <td className="p-3">{item?.product?.ms_item_code}</td>

                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{nairaFormat(item?.amount)}</td>
                  <td className="p-3  text-right">{nairaFormat(item?.amount * item?.quantity)}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        <div>
          <div className="flex justify-between gap-4 items-center my-4">
            <p className="px-4 border py-2 rounded-lg ">Thank you for your Patonage</p>
            <div className="">
              <div className="flex justify-between gap-4">
                <span className="font-semibold"> SUB TOTAL</span>
                {' '}
                <span>{nairaFormat(invoice?.sub_total_amount)}</span>
                {' '}
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold"> VAT</span>
                {' '}
                <span>{nairaFormat(invoice?.vat)}</span>
                {' '}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold"> TOTAL</span>
                {' '}
                <span>{nairaFormat(invoice?.total_amount)}</span>
                {' '}
              </div>
            </div>

          </div>

          <div className="bg-primary w-full h-4 mt-5 rounded-br-2xl rounded-tl-2xl " />

          <div className="flex justify-between mt-4">
            <div>
              <div className="flex gap-4 items-center">
                <span><FaLocationDot className="text-primary" /></span>
                {' '}
                <span className="font-medium text-gray-600"> 1 Kandi Close, Wuse 2 Abuja, Nigeria</span>
              </div>
              <div className="flex gap-4 items-center">
                <span><FaPhone className="text-primary" /></span>
                {' '}
                <span className="font-medium text-gray-600"> +2348123111983 </span>
                <span><MdOutlineMailOutline className="text-primary" /></span>
                {' '}
                <span className="font-medium text-gray-600"> melisports1@gmail.com </span>
                <span><TiWorldOutline className="text-primary" /></span>
                {' '}
                <span className="font-medium text-gray-600"> www.melisports.com </span>
              </div>

              <div className="flex gap-4 items-center">
                <FaFacebook className="text-primary" />
                <span>melisports</span>
                <FaTwitter className="text-primary" />
                {' '}
                <span>melisports</span>
                {' '}
                <FaInstagramSquare className="text-primary" />
                {' '}
                <span> melisports1@gmail.com</span>

              </div>

            </div>
            <h2 className="text-2xl font-medium">Melisports</h2>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Invoice;

import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClickButton from "../../../components/buttons/ClickButton.jsx";
import {
  createInvoice,
  getOrder,
  updateOrder,
} from "../../../redux/actions/orders.js";
import { nairaFormat } from "../../../utils/nairaFormat.js";
import DiscoverBtn from "../../../components/buttons/AppButton.jsx";
import Loader from "../../Loader.jsx";
import Confirmation from "../../../components/modal/Confirmation.jsx";
import localDate from "../../../utils/dateFormat.js";
import { getStatistics } from "../../../redux/actions/statistics.js";
import Invoice from "../../../components/invoice/Invoice.jsx";
import AppModal from "../../../components/modal/AppModal.jsx";
import { closeLoader, setLoader } from "../../../redux/app/app.js";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contRef = useRef();
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const { order, loading } = useSelector((state) => state.orders);
  const [openInvoice, setOpenInvoice] = useState(false);

  const handleUpdate = (status) => {
    dispatch(setLoader(true));

    dispatch(updateOrder({ id, order_detail: { status } }))
      .unwrap()
      .then((result) => {
        dispatch(getOrder(id));
        toast("order updated", { type: "success" });

        setOpenDecline(false);
        setOpenAccept(false);
      })
      .catch((err) => {
        toast(err?.message, { type: "error" });
      })
      .finally(() => {
        dispatch(closeLoader(false));
      });
  };

  const handleInvoiceGeneration = () => {
    dispatch(setLoader(true));
    dispatch(
      createInvoice({
        invoice: {
          order_detail_id: id,
        },
      }),
    )
      .unwrap()
      .then((res) => {
        dispatch(closeLoader());
        dispatch(getOrder(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !order?.viewed) {
          dispatch(updateOrder({ id, data: { viewed: true } })).then(
            (result) => {
              if (updateOrder.fulfilled.match(result)) {
                dispatch(getStatistics());
              }
            },
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <MdOutlineKeyboardBackspace className="text-xl text-gray-700" />
            </button>

            <div>
              <p className="text-xs text-gray-500">Order / Order details</p>
              <p className="text-xl font-semibold text-gray-800">
                Order #{order?.order_number}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Left */}
              <div className="space-y-3">
                <p className="text-2xl font-semibold text-gray-800">
                  Order #{order?.order_number}
                </p>

                {/* Status */}
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full font-medium
          ${
            order?.status === "pending"
              ? "bg-orange-100 text-orange-700"
              : order?.status === "declined"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
          }`}
                >
                  {order?.status === "pending"
                    ? "Awaiting confirmation"
                    : order?.status === "declined"
                      ? "Order Rejected"
                      : "Ready to ship"}
                </span>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded-md">
                    Ordered: {localDate(order?.created_at)}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-md">
                    Paid on: 2024-02-13
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-md">
                    Delivery: Standard
                  </span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                  More
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition">
                  Create Shipping Label
                </button>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex justify-end mt-4">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
        ${
          order?.status === "pending"
            ? "bg-orange-100 text-orange-700"
            : order?.status === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
        }`}
              >
                {order?.status}
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Customer */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-gray-700">
                  CUSTOMER & ORDER
                </p>
                <ClickButton>Edit</ClickButton>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-800">
                    {order?.billing_address?.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span>{order?.billing_address?.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span>{order?.billing_address?.phone_no}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span className="uppercase font-medium">
                    {order?.payment_method}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span>Shipping</span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-gray-700">
                  SHIPPING ADDRESS
                </p>
                <ClickButton>Edit</ClickButton>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {order?.billing_address?.street} <br />
                {order?.billing_address?.city}, {order?.billing_address?.state}
              </p>
            </div>

            {/* Billing (renamed for clarity) */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-gray-700">
                  BILLING ADDRESS
                </p>
                <ClickButton>Edit</ClickButton>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {order?.billing_address?.street} <br />
                {order?.billing_address?.city}, {order?.billing_address?.state}
              </p>
            </div>
          </div>
        </div>
        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg text-gray-800">Items Ordered</p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            {loading ? (
              <Loader />
            ) : (
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3" />
                    <th className="px-4 py-3">Item Name</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {order?.order_items?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-3">
                        <img
                          src={item.photo_url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.product.name}
                      </td>

                      <td className="px-4 py-3">{item.product.sku}</td>

                      <td className="px-4 py-3">{item.product.ms_code}</td>

                      <td className="px-4 py-3 text-center">{item.quantity}</td>

                      <td className="px-4 py-3 text-right font-medium">
                        {nairaFormat(item.amount)}
                      </td>

                      <td className="px-4 py-3 text-right font-semibold text-gray-800">
                        {nairaFormat(item.amount * item.quantity)}
                      </td>
                    </tr>
                  ))}

                  {/* Shipping Row */}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Shipping
                    </td>
                    <td colSpan="5" />
                    <td className="px-4 py-3 text-right font-medium">
                      {nairaFormat(order?.delivery_fee ?? 0)}
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-white border-t-2">
                    <td className="px-4 py-4 font-bold text-gray-900 text-lg">
                      Total
                    </td>
                    <td colSpan="5" />
                    <td className="px-4 py-4 text-right text-xl font-bold text-gray-900">
                      {nairaFormat(parseInt(order?.net_total))}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-3 text-sm text-gray-500">
            Currency: <span className="font-medium text-gray-700">NGN</span>
          </div>
        </div>
        <div className="my-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg text-gray-800">Invoices</p>

            {order?.invoice ? (
              <ClickButton onClick={() => setOpenInvoice(true)}>
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

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-600">
              {/* Head */}
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200">
                {/* Example Row (replace with real data later) */}
                <tr className="bg-white hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-500">INV-001</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {nairaFormat(order?.net_total || 0)}
                  </td>
                  <td className="px-4 py-3">{order?.billing_address?.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Paid
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {localDate(order?.created_at)}
                  </td>
                </tr>

                {/* Shipping */}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Shipping
                  </td>
                  <td className="px-4 py-3 text-right">
                    {nairaFormat(order?.delivery_fee ?? 0)}
                  </td>
                  <td colSpan="3" />
                </tr>

                {/* Total */}
                <tr className="bg-white border-t-2">
                  <td className="px-4 py-4 font-bold text-gray-900">Total</td>
                  <td className="px-4 py-4 text-right text-lg font-bold text-gray-900">
                    {nairaFormat(order?.net_total || 0)}
                  </td>
                  <td colSpan="3" />
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-3 text-sm text-gray-500">
            Currency: <span className="font-medium text-gray-700">NGN</span>
          </div>
        </div>
        <div className="flex justify-between">
          <DiscoverBtn
            type="cancel"
            btnText="Decline Order"
            onclick={() => setOpenDecline(true)}
          />

          <DiscoverBtn
            btnText="Confirm Order"
            onclick={() => setOpenAccept(true)}
          />
        </div>

        <Confirmation
          open={openAccept}
          onCancel={() => {
            setOpenAccept(false);
          }}
          onConfirm={() => {
            handleUpdate("confirmed");
          }}
        />
        <Confirmation
          open={openDecline}
          onCancel={() => {
            setOpenDecline(false);
          }}
          onConfirm={() => {
            handleUpdate("declined");
          }}
        >
          Confrim Reject Order
        </Confirmation>
      </div>
      <AppModal open={openInvoice} onClose={() => setOpenInvoice(false)}>
        <Invoice id={order?.invoice?.id} />

        <button
          className="bg-gray-200 px-4 py-2 mt-2 rounded-lg"
          onClick={() => setOpenInvoice(false)}
        >
          Close
        </button>
        <Confirmation
          open={openDecline}
          onCancel={() => {
            setOpenDecline(false);
          }}
          onConfirm={() => {
            handleUpdate("confirmed");
          }}
        >
          Confrim Reject Order
        </Confirmation>
      </AppModal>
    </>
  );
};

export default OrderDetails;

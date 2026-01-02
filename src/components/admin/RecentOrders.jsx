import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getOrders } from '../../redux/actions/orders';
import { nairaFormat } from '../../utils/nairaFormat';
import StatusButton from '../buttons/StatusButton';

const RecentOrders = () => {
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="recent-orders relative my-7 overscroll-x-auto overflow-x-auto bg-gray-100">

      <h2 className="my-4 font-medium">Recent orders</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full" />
      </div>

      <table className="w-full">
        <thead className="text-[13px] text-slate-500/70">
          <tr>
            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left">#</div>
            </th>
            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left">Qty</div>
            </th>

            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left">Price</div>
            </th>
            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left">Payment</div>
            </th>
            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left">Status</div>
            </th>

            <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
              <div className="font-medium text-left sr-only">Action</div>
            </th>
          </tr>
        </thead>

        <tbody className="text-sm font-medium">
          {orders.slice(0, 5).map((order) => (
            <tr>

              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div className="text-slate-500">{order?.order_number ?? 'N/A'}</div>
              </td>

              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div className="text-slate-900">{order?.orders_count ?? 0}</div>
              </td>
              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div className="text-slate-900">{nairaFormat(order?.total)}</div>
              </td>
              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div className="text-slate-900">{order?.payment_method}</div>
              </td>
              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                <div className="text-emerald-500"><StatusButton status={order?.status} /></div>
              </td>

              <td className="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-[12px] last:pl-5 last:sticky last:right-0">
                <button
                  onClick={() => navigate(`/admin/orders/${order?.id}`)}
                  className="h-8 whitespace-nowrap justify-center rounded-full px-3 py-1 text-sm font-medium text-indigo-500 hover:text-white border border-slate-200 shadow-sm hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors group"
                >
                  View
                  {' '}
                  <span className="text-slate-200 group-hover:text-indigo-400 transition-colors">/</span>
                  {' '}
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink to="/admin/orders" className="block text-center my-4 border w-max m-auto rounded py-1 px-3">Show all</NavLink>

    </div>
  );
};

export default RecentOrders;

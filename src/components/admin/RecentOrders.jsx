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
    <div className="recent-orders my-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">

      {/* Header */}
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Recent Orders
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-600">

          {/* Head */}
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right sr-only">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {orders.slice(0, 5).map((order, index) => (
              <tr
                key={order?.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 text-gray-500">
                  {order?.order_number ?? 'N/A'}
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {order?.orders_count ?? 0}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-gray-800">
                  {nairaFormat(order?.total)}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {order?.payment_method}
                </td>

                <td className="px-4 py-3">
                  <StatusButton status={order?.status} />
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/admin/orders/${order?.id}`)}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                  >
                    View
                    <span className="opacity-50 group-hover:opacity-100">/</span>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-center">
        <NavLink
          to="/admin/orders"
          className="text-sm font-medium text-indigo-600 hover:text-white border border-gray-300 px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
        >
          Show all
        </NavLink>
      </div>
    </div>
  );
};

export default RecentOrders;

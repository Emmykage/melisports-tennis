import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions/orders';
import { nairaFormat } from '../../utils/nairaFormat';
import StatusButton from '../buttons/StatusButton';
import { NavLink } from 'react-router-dom';

const RecentOrders = () => {
  const {orders} = useSelector(state => state.orders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders());

  }, []);

  console.log(orders)

  
  return (
  <div className="recent-orders overscroll-x-auto bg-gray-100">

    <h2 className='my-4'>Recent orders</h2>
    <table>
      <thead>
        <tr>
          <th className="px-2">Order Number</th>
          <th className="px-2 text-center">Product Qty</th>
          <th className="px-2 text-left">Amount</th>
          <th className="px-2 text-center">Payment</th>
          <th className="px-2 text-center">Status</th>

        </tr>

      </thead>
      <tbody className="text-white">
        {orders.slice(0,10).map((order) => (
          <tr>
            <td className='font-semibold'>{order?.order_number}</td>
            <td className='text-center font-semibold'>{order?.orders_count}</td>
            <td className='text-left font-semibold px-'>{nairaFormat(order?.total)}</td>
            <td className='text-center font-semibold'>{order?.payment_method}</td>
            <td className='text-center font-semibold'><StatusButton status={order?.status}/></td>
            {/* <td className={order.shipping === 'Declined' ? 'danger' : order.shipping === 'pending' ? 'warning' : 'primary'}>{order.shipping}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
    <NavLink to="/admin/orders">Show all</NavLink>

  </div>
);
}

export default RecentOrders;

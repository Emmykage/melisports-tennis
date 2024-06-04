import React from 'react';
import orders from './Orders';

const RecentOrders = () => (
  <div className="recent-orders">

    <h2>Recent orders</h2>
    <table>
      <thead>
        <tr>
          <th className="px-2">Product name</th>
          <th className="px-2 text-center">Product number</th>
          <th className="px-2 text-center">Payment</th>
          <th className="px-2 text-center">Status name</th>

        </tr>

      </thead>
      <tbody className="text-white">
        {orders.map((order) => (
          <tr>
            <td>{order.productName}</td>
            <td>{order.productNumber}</td>
            <td>{order.productStatus}</td>
            <td className={order.shipping === 'Declined' ? 'danger' : order.shipping === 'pending' ? 'warning' : 'primary'}>{order.shipping}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <a href="#">Show all</a>

  </div>
);

export default RecentOrders;

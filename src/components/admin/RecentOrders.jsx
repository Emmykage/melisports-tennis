import React from 'react';
import orders from './Orders';

const RecentOrders = () => (
  <div className="recent-orders">

    <h2>Recent orders</h2>
    <table>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Product number</th>
          <th>Payment</th>
          <th>Status name</th>

        </tr>

      </thead>
      <tbody>
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

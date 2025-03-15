import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import styled from 'styled-components';

const OrderDetail = ({ orderProp, isActive }) => {
  const showDetail = {
    height: 'fit-content',
  };

  const activeLink = 'order-detail show';
  const normalLink = 'order-detail';
  return (
    <div className={isActive ? activeLink : normalLink}>

      <h3 className="center">
        Order number:
        {orderProp?.invoice_number}
      </h3>
      <table>

        <thead>
          <tr>
            <th />
            <th>name</th>
            <th>cost</th>
            <th>quantity</th>
            <th>subtotal</th>
          </tr>

        </thead>
        <tbody>

          {orderProp?.order_items.map((item) => (
            <tr>
              <td><img className="w-20 h-20" src={item?.photo_url} alt="product_image" /></td>
              <td>{item?.product.name}</td>
              <td>{item?.product.price}</td>
              <td>{item?.product.quantity}</td>
              <td>{item?.product.quantity * item?.product.price }</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
};

export default OrderDetail;

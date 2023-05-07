import React from 'react';
import styled from 'styled-components';

const OrderDetail = ({ order_prop, isActive }) => {
  const showDetail = {
    height: 'fit-content',
  };

  const activeLink = 'order-detail show';
  const normalLink = 'order-detail';
  return (
    <div className={isActive ? activeLink : normalLink}>

      <h3 className="center">
        Order number: 00000000101
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
          <tr>
            <td><img src="#" alt="product_image" /></td>
            <td> Pure drive Lite</td>
            <td>120000</td>
            <td>2</td>
            <td>240000</td>
          </tr>
          <tr>
            <td><img src="#" alt="product_image" /></td>
            <td> Pure drive Lite</td>
            <td>120000</td>
            <td>2</td>
            <td>240000</td>
          </tr>
          <tr>

            <td>
              <img src="#" alt="product_image" />
            </td>
            <td>
              evo drive
            </td>
            <td>80000</td>
            <td>1</td>
            <td>8000</td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />

            <td>
              560000
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default OrderDetail;

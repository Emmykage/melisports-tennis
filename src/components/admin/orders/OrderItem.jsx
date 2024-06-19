import React, { useState } from 'react';
import OrderDetail from './OrderDetail';

const OrderItem = ({ order_prop }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive((prevState) => !prevState);
  };
  return (
    <li className="order-item">
      <div className="order-header flex justify-between items-center">
        <span>Menanya Morris</span>
        <a onClick={toggleClass}>
          show details
        </a>
        <span>
          <input type="checkbox" />
        </span>
      </div>
      <OrderDetail orderProp={order_prop} isActive={isActive} />

    </li>
  );
};

export default OrderItem;

import React from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';

const AnalyticsCard = ({ count, source }) => (
  <div className="item bg-white px-2 md:px-3 py-5 gap-3 online border rounded-lg flex flex-row sm:flex-co lg:flex-row mb-3 items-center">
    <div className="icon">
      {source === 'online orders'
        ? <span><AiOutlineShoppingCart /></span>
        : source === 'offline orders'
          ? <span><AiOutlineShop /></span>
          : <span><AiOutlineUser /></span>}

    </div>
    <div>

      <div className="right gap-3 flex flex-row sm:flex-co sm:justify-center lg:justify-between lg:flex-row">
        <div className="info ">
          <h3 className="font-medium uppercase">{source}</h3>

        </div>
        <h5 className="success"> +39</h5>
        <h3>{count}</h3>
      </div>
      <small className="text-muted">
        last 24 hours
      </small>
    </div>

  </div>
);

export default AnalyticsCard;

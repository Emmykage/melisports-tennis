import React from 'react';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { nairaFormat } from '../../../utils/nairaFormat';

const Sales = () => (

  <div className="sales border p-4">
    <span className="icon">
      <IoAnalyticsSharp className="icon-chart" />
    </span>
    <div className="middle flex justify-between items-center">
      <div className="left">
        <h3>Total sales</h3>
        <h1 className='font-semibold'> {nairaFormat(25000)}</h1>

      </div>
      <div className="progresser relative w-16 h-16">
        <svg className='w-full h-full'>
          <circle cx="28" cy="28" r="26" />
        </svg>
        <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <p>81%</p>
        </div>
      </div>

    </div>
    <small className="text-muted block mt-2">
      Last 24 hours
    </small>
  </div>
);

export default Sales;

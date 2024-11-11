import React from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { nairaFormat } from '../../../utils/nairaFormat';

const Income = () => (

  <div className="income border p-4">
    <span className="icon">
      <AiOutlineLineChart className="icon-chart" />

    </span>
    <div className="middle flex justify-between items-center">
      <div className="left">
        <h3>Total income</h3>
        <h1 className='font-semibold'> {nairaFormat(25000)}</h1>

      </div>
      <div className="progresser ad relative  w-16 h-16">
        <svg className='w-full h-full'>
          <circle  cx="28" cy="28" r="24" />
        </svg>
        <div className="number absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <p className='font-semibold'>81%</p>
        </div>
      </div>

    </div>
    <small className="text-muted">
      Last 24 hours
    </small>
  </div>

);

export default Income;

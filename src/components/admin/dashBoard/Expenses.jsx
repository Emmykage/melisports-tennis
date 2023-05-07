import React from 'react';
import { BsBarChartLineFill } from 'react-icons/bs';

const Expenses = () => (

  <div className="expenses">
    <span className="icon">
      <BsBarChartLineFill />
    </span>
    <div className="middle">
      <div className="left">
        <h3>Total Expenses</h3>
        <h1>$25,000</h1>

      </div>
      <div className="progresser ad">
        <svg>
          <circle cx="38" cy="38" r="36" />
        </svg>
        <div className="number">
          <p>81%</p>
        </div>
      </div>

    </div>
    <small className="text-muted">
      Last 24 hours
    </small>
  </div>

);

export default Expenses;

import React from 'react';
import { IoAnalyticsSharp } from 'react-icons/io5';
import Expenses from './Expenses';
import Income from './Income';
import RecentOrders from '../../../components/admin/RecentOrders';
import Sales from './Sales';

const Main = () => (
  <main>
    <h1 className='text-3xl font-semibold'>Dashboard</h1>
    <div className="date">
      <input type="date" />
    </div>
    <div className="insight">
      <Sales />
      <Expenses />
      <Income />
    </div>
    <RecentOrders />
  </main>
);

export default Main;

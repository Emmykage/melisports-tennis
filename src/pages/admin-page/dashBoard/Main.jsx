import React from 'react';
import { IoAnalyticsSharp } from 'react-icons/io5';
import Expenses from './Expenses';
import Income from './Income';
import RecentOrders from '../../../components/admin/RecentOrders';
import Sales from './Sales';

const Main = () => (
  <main className='mt-12 md:mt-0'>
    <h1 className='text-3xl font-semibold'>Dashboard</h1>
    <div className="date">
      <input type="date" />
    </div>
    <div className="insight gap-4 py-5 grid lg:grid-cols-3">
      <Sales />
      <Expenses />
      <Income />
    </div>
    <RecentOrders />
  </main>
);

export default Main;

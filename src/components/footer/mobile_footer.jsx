import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';

import { NavLink } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';

const MobileFooter = () => (
  <div className="fixed bottom-0 w-full flex lg:hidden h-10 bg-gray-200/70 ">
    <div className="border flex-1 border-gray-300 text-center text-2xl flex justify-center items-center">
      <NavLink to="/products">
        <HiViewGridAdd />

      </NavLink>
    </div>
    <div className="flex-1 border border-gray-300 text-center text-2xl flex justify-center items-center">
      <NavLink to="/carts">
        {' '}
        <BsCart4 />
      </NavLink>
    </div>

  </div>
);

export default MobileFooter;

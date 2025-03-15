import React, { useState } from 'react';
import {
  AiOutlineMenu, AiOutlineShoppingCart, AiOutlineShop, AiOutlineUser, AiOutlinePlus,
} from 'react-icons/ai';
import { HiLightBulb } from 'react-icons/hi';
import { MdDarkMode } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import IMG from '../../assets/images/profile/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
import AnalyticsCard from '../analytics/AnalyticsCard';

const Right = ({ handleMenu, user, stats }) => (
  <div className="right bg-white px-2 py-4 h-screen overflow-y-auto no-scroll">
    <div className="fixed bg-white md:relative top-0 left-0 items-center lg:px-3 h-20 w-full z-20 shadow-lg top flex justify-between md:justify-between gap-4">
      <button id="menu-btn" className="block md:hidden ">
        <span onClick={handleMenu}>
          <AiOutlineMenu className="iconStyle" />
        </span>
      </button>
      <div className="theme-toggler rounded-lg w-16 flex items-center bg-gray-300 justify-between">
        <span className="text-lg w-1/2 flex items-center justify-center h-full"><HiLightBulb /></span>
        <span className="text-lg w-1/2 flex items-center justify-center h-full"><MdDarkMode /></span>

      </div>
      <div className="profile flex text-center gap-6">
        <div className="info">
          <p>
            Hey,
            <b>
              {' '}
              {user.first_name}
              {' '}
            </b>
          </p>
          <small className="text-muted">Admin</small>
        </div>
        <div className="profile-photo">
          <img src={IMG} alt="" />
        </div>
      </div>
    </div>
    <div className="recent-updates">
      <h2 className="mb-4 font-medium">Recent updates</h2>
      <div className="updates px-3 py-3 shadow-xl hover:shadow-none transition-all duration-300 ease-linear">
        <div className="update flex gap-3 my-3">
          <div className="profile-photo">
            <img src={IMG} alt="" />
          </div>
          <div className="message">
            <p>
              <b>Mike Tyson</b>
              received his order
            </p>
            <small className="text-muted">@ Minutes ago</small>
          </div>
        </div>
        <div className="update gap-2 flex">
          <div className="profile-photo w-10">
            <img src={IMG} alt="prifile pic" />
          </div>
          <div className="message">
            <p>
              <b>Mike Tyson</b>
              received his order
            </p>
            <small className="text-muted">@ Minutes ago</small>
          </div>
        </div>

      </div>
    </div>
    <div className="sales-analytics">
      <h2 className="font-medium mb-4">Sales Analytics</h2>
      <AnalyticsCard count={stats?.offline_orders} source="online orders" />
      <AnalyticsCard count={stats?.offline_orders} source="offline orders" />
      <AnalyticsCard count={5} source="New Customers" />
      <div className="item add-product py-5 sm:py-6 lg:py-7 mb-5">
        <div>
          <span>
            <AiOutlinePlus />
          </span>
          <h3>
            <NavLink to="/admin/addproduct">
              Add Product
            </NavLink>
          </h3>
        </div>
      </div>
      <div className="item add-product  py-5 sm:py-6 lg:py-7">
        <div>
          <span>
            <AiOutlinePlus />
          </span>
          <h3>
            {/* <a onClick={()=> dispatch(setModal())}> */}
            <NavLink to="/admin/add_product_category">
              Add category

            </NavLink>
            {/* </a> */}
          </h3>
        </div>
      </div>
    </div>
  </div>

);

export default Right;

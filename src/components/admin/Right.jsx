import React, { useState } from 'react';
import {
  AiOutlineMenu, AiOutlineShoppingCart, AiOutlineShop, AiOutlineUser, AiOutlinePlus,
} from 'react-icons/ai';
import { HiLightBulb } from 'react-icons/hi';
import { MdDarkMode } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IMG from '../../assets/images/profile/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
import { setModal } from '../../redux/modal/categoryModal';

const Right = ({ handleMenu, user }) => (
  <div className="right h-screen overflow-y-auto">
    <div className="top">
      <button id="menu-btn">
        <span onClick={handleMenu}>
          <AiOutlineMenu className="iconStyle" />
        </span>
      </button>
      <div className="theme-toggler">
        <span><HiLightBulb /></span>
        <span><MdDarkMode /></span>

      </div>
      <div className="profile">
        <div className="info">
          <p>
            Hey,
            <b>
              {' '}
              {user.email}
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
    {/* end of top */}
    <div className="recent-updates">
      <h2>Recent updates</h2>
      <div className="updates">
        <div className="update">
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
        <div className="update">
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
        <div className="update">
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
      </div>
    </div>
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <div className="item online border rounded">
        <div className="icon">
          <span><AiOutlineShoppingCart /></span>
        </div>
        <div className="right">
          <div className="info ">
            <h3>ONLINE ORDERS</h3>
            <small className="text-muted">
              last 24 hours
            </small>
          </div>
          <h5 className="success"> +39</h5>
          <h3>3849</h3>
        </div>
      </div>
      <div className="item offline border rounded">
        <div className="icon">
          <span><AiOutlineShop /></span>
        </div>
        <div className="right">
          <div className="info">
            <h3>OFFLINE ORDERS</h3>
            <small className="text-muted">
              last 24 hours
            </small>
          </div>
          <h5 className="danger"> +17</h5>
          <h3>1100</h3>
        </div>
      </div>
      <div className="item customers border rounded">
        <div className="icon">
          <span><AiOutlineUser /></span>
        </div>
        <div className="right">
          <div className="info">
            <h3>NEW CUSTOMERS</h3>
            <small className="text-muted">
              last 24 hours
            </small>
          </div>
          <h5 className="success"> +25</h5>
          <h3>849</h3>
        </div>

      </div>
      <div className="item add-product">
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
      <div className="item add-product">
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

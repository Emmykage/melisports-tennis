import React from 'react';
import '../../pages/admin-page/adminstyle.css';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { BsFillGrid1X2Fill } from 'react-icons/bs';

import { GiReceiveMoney } from 'react-icons/gi';
import { IoAnalyticsSharp, IoAddSharp } from 'react-icons/io5';
import { RiMessageLine } from 'react-icons/ri';
import {
  MdHome, MdOutlineInventory, MdOutlineReport, MdOutlineSell,
} from 'react-icons/md';

import { FiSettings } from 'react-icons/fi';

import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/images/logo/melisport_1.png';
import { userProfile } from '../../redux/actions/auth';

const SideNav = ({ showMenu, handleMenu, stats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeLink = 'active flex';
  const normalLink = 'ml-4 flex';

  const signOut = () => {
    localStorage.removeItem('meli_auth');
    dispatch(userProfile());
    navigate('/auth/admin_login');
  };
  return (

    <aside className={`${showMenu ? 'display' : ''}  pt-20 lg:pt-5 flex-col justify-center overflow-y-auto  no-scroll shadow`}>
      <div className="top">

        <div className="logo  text-center">

          <NavLink className="img-div w-28" to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="close ml-3">
          {/* <span onClick={handleMenu}>
            <AiOutlineClose className="iconStyle text-gray-500" />
          </span> */}

        </div>

      </div>
      <div className="side-bar justify-center  flex flex-col h-[84vh] relative">
        <NavLink
          to="/"
          className="ml-4 border-b flex lg:hidden"
          onClick={handleMenu}
        >
          <span>
            {' '}
            <MdHome />
          </span>
          <h3 className="font-medium">Hoe</h3>
        </NavLink>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}
        >
          <span>
            {' '}
            <BsFillGrid1X2Fill />
          </span>
          <h3 className="font-medium">Dashboard</h3>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <AiOutlineUser />
          </span>
          <h3 className="font-medium">Customers</h3>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <MdOutlineSell />
          </span>
          <h3 className="font-medium">Orders</h3>
          <span className="message-count text-white">{stats?.viewed_orders}</span>

        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <IoAnalyticsSharp />
          </span>
          <h3 className="font-medium">Analytics</h3>
        </NavLink>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <RiMessageLine />
          </span>
          <h3 className="font-medium">Messages</h3>
          <span className="message-count">{stats?.messages}</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <MdOutlineInventory />
          </span>
          <h3 className="font-medium">Products</h3>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <FiSettings />
          </span>
          <h3 className="font-medium">Settings</h3>
        </NavLink>
        <NavLink
          to="/admin/addproduct"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}

        >
          <span>
            {' '}
            <IoAddSharp />
          </span>
          <h3 className="font-medium">Add product</h3>
        </NavLink>

        <NavLink
          to="/admin/delivery-fee"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <MdOutlineReport />
          </span>
          <h3 className="font-medium">Delivery</h3>
        </NavLink>
        {/* <NavLink
        to="/admin/delivery"
        className={({ isActive }) => (isActive ? activeLink : normalLink)}

>
          <span>
            {' '}
            <MdOutlineReport />
          </span>
          <h3 className='font-medium'>Report</h3>
        </NavLink> */}

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : 'md:ml-8 ml-4 flex items-center relative h-14 ')}
          onClick={handleMenu}

        >

          <h3>Go to store</h3>
        </NavLink>
        <NavLink

          className={({ isActive }) => (isActive ? activeLink : normalLink)}

          onClick={signOut}
        >
          <span>
            {' '}
            <BiLogOut />
          </span>
          <h3 className="font-medium">Log out</h3>
        </NavLink>
      </div>

    </aside>

  );
};

export default SideNav;

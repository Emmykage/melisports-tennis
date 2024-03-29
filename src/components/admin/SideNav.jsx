import React from 'react';
import './adminstyle.css';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { BsFillGrid1X2Fill } from 'react-icons/bs';

import { GiReceiveMoney } from 'react-icons/gi';
import { IoAnalyticsSharp, IoAddSharp } from 'react-icons/io5';
import { RiMessageLine } from 'react-icons/ri';
import { MdOutlineInventory, MdOutlineReport } from 'react-icons/md';

import { FiSettings } from 'react-icons/fi';

import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/melisport_1.png';

const SideNav = (props) => {
  const { showMenu, handleMenu } = props;
  const navigate = useNavigate();

  const activeLink = 'active';
  const normalLink = '';

  const signOut = () => {
    localStorage.setItem('meli_auth', '');
    navigate('/auth/admin_login');
  };
  return (

    <aside className={showMenu ? 'display' : ''}>
      <div className="top">

        <div className="logo">

          <NavLink className="img-div" to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="close">
          <span onClick={handleMenu}>
            <AiOutlineClose className="iconStyle" />
          </span>

        </div>

      </div>
      <div className="side-bar">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <BsFillGrid1X2Fill />
          </span>
          <h3>Dashboard</h3>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <AiOutlineUser />
          </span>
          <h3>Customers</h3>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <GiReceiveMoney />
          </span>
          <h3>Orders</h3>
        </NavLink>
        {/* </div> */}
        {/* <div className='side-bar'> */}
        <NavLink
          to="/admin/analytics"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <IoAnalyticsSharp />
          </span>
          <h3>Analytics</h3>
        </NavLink>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <RiMessageLine />
          </span>
          <h3>Messages</h3>
          <span className="message-count">25</span>
        </NavLink>
        {/* </div> */}
        {/* <div className='side-bar'> */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <MdOutlineInventory />
          </span>
          <h3>Products</h3>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <FiSettings />
          </span>
          <h3>Settings</h3>
        </NavLink>
        <NavLink
          to="/admin/addproduct"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <span>
            {' '}
            <IoAddSharp />
          </span>
          <h3>Add product</h3>
        </NavLink>
        {/* </div> */}
        {/* <div className='side-bar'> */}
        <NavLink to="/admin/reports">
          <span>
            {' '}
            <MdOutlineReport />
          </span>
          <h3>Report</h3>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >

          <h3>Go to store</h3>
        </NavLink>
        <a
          onClick={signOut}
        >
          <span>
            {' '}
            <BiLogOut />
          </span>
          <h3>Log out</h3>
        </a>
      </div>

    </aside>

  );
};

export default SideNav;

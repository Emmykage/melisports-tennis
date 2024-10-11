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
import { useDispatch } from 'react-redux';
import logo from '../../assets/images/logo/melisport_1.png';
import { userProfile } from '../../redux/actions/auth';

const SideNav = (props) => {
  const { showMenu, handleMenu } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeLink = 'active';
  const normalLink = '';

  const signOut = () => {
    localStorage.removeItem('meli_auth');
    dispatch(userProfile());
    navigate('/auth/admin_login');
  };
  return (

    <aside className={`${showMenu ? 'display' : ''} no-scroll border-r shadow`}>
      <div className="top">

        <div className="logo text-center">

          <NavLink className="img-div" to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="close ml-3">
          <span onClick={handleMenu}>
            <AiOutlineClose className="iconStyle text-gray-500" />
          </span>

        </div>

      </div>
      <div className="side-bar">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={handleMenu}
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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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
          onClick={handleMenu}

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

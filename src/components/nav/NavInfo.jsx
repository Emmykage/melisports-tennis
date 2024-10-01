import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import { FiUser, FiMenu } from 'react-icons/fi';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineShopping } from 'react-icons/ai';
import { calculateTotal } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
import SearchComponent from './SearchComponent';
import { closeNav, openNav } from '../../redux/modal/nav';
import logo from '../../assets/images/logo/melisport_1.png';
import { userLog } from '../../redux/user/user';

const NavInfo = () => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { toggleNav } = useSelector((state) => state.navToggle);
  const [stickyNav, setStickyNav] = useState('');

  const toggleScrollNav = (e) => {
    if (window.scrollY >= 120) {
      setStickyNav('sticky-nav');
    } else {
      setStickyNav('');
    }
  };
  useEffect(() => {
    dispatch(userLog());
    dispatch(getCarts());
    dispatch(calculateTotal());
    window.addEventListener('scroll', toggleScrollNav);
  }, [update]);
  const handleLogOut = () => {
    localStorage.setItem('meli_auth', '');
    dispatch(userLog());
    navigate('/auth/login');
  };
  return (
    <>
      <nav>

        <div className={`${stickyNav} navbar nav-info`}>
          <div className="mobile-menu-div">
            <a className="menu">
              <FiMenu className="menu-icon" onClick={() => dispatch(openNav())} />
            </a>
          </div>
          <div className="logo">
            <NavLink className="img-div" to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>

          <div className="nav-div flex">
            <div className="flex-1 flex justify-center">

              <ul className={toggleNav ? 'nav-links  show-menu' : 'nav-links flex w-full'}>
                <div className="mobile-menu-div  my-4">
                  <AiOutlineClose className="menu-icon close-icon" onClick={() => dispatch(closeNav())} />
                </div>

                <li className="nav-item"><NavLink to="/" onClick={() => dispatch(closeNav())}>Home</NavLink></li>
                <li className="nav-item"><NavLink to="/products" onClick={() => dispatch(closeNav())}>Products</NavLink></li>
                <li className="nav-item"><NavLink to="/contact" onClick={() => dispatch(closeNav())}>Contact Us</NavLink></li>
                <li className="nav-item"><NavLink to="/about" onClick={() => dispatch(closeNav())}>About Us</NavLink></li>
                <li className="nav-item"><NavLink to="/store" onClick={() => dispatch(closeNav())}>Go to store</NavLink></li>

                {user !== null && ((user.role == 'admin') && (
                <li className="nav-item">
                  <NavLink to="/admin">    go to admin </NavLink>
                  {' '}
                </li>
                ))}

                <li className="nav-item last">
                  <span><FiUser className="user-icon" /></span>

                  {user == undefined ? <NavLink to="/auth/login">Login</NavLink> : <a onClick={handleLogOut}>Log Out</a> }

                </li>

              </ul>
            </div>
            <a href="#survey" className="bg-gray-60 py-1 rounded px-3 hidden md:block"> Survey</a>

            <div className="flex justify-between items-center">

              <div className="user mobile-display ">
                {user == undefined ? <NavLink to="/auth/login">Login</NavLink> : <a onClick={handleLogOut}>Log Out</a> }

                <span className="text-dark"><FiUser className="user-icon" /></span>

              </div>
              <NavLink to="/store">
                {/* <NavLink to="/"> */}
                <AiOutlineShopping className="menu-icon cart-icon" />
              </NavLink>

              <div className="menu-div cart">
                <NavLink to="/carts">

                  <BsCartDash className="menu-icon cart-icon" />
                  <span className="total-amount text-white bold">{counter}</span>

                </NavLink>
              </div>
            </div>
          </div>

        </div>
        <SearchComponent />
      </nav>
    </>
  );
};

export default NavInfo;

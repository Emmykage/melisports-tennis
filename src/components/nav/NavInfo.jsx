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
import logo from '../../assets/images/logo/melisport_1.png';
import { userLog } from '../../redux/user/user';
import { userProfile } from '../../redux/actions/auth';
import { removeToken } from '../../hooks/localStorage';
import ButtonSession from './components/ButtonSession';

const NavInfo = () => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const [stickyNav, setStickyNav] = useState('');

  const toggleScrollNav = (e) => {
    if (window.scrollY >= 120) {
      setStickyNav('sticky-nav');
    } else {
      setStickyNav('');
    }
  };
  useEffect(() => {
    dispatch(getCarts());
    dispatch(calculateTotal());
    window.addEventListener('scroll', toggleScrollNav);
  }, [update]);

  const handleLogOut = () => {
    localStorage.removeItem('meli_auth');
    dispatch(userProfile());
    navigate('/auth/login');
  };

  return (
    <>
      <nav>

        <div className={`${stickyNav} navbar bg-gray-300 nav-info`}>
          <div className="mobile-menu-div">
            <a className="menu">
              <FiMenu className="menu-icon" onClick={() => setToggleNav((prev) => !prev)} />
            </a>
          </div>
          <div className="logo shrink-0">
            <NavLink className="img-div" to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>

          <div className="nav-div flex">
            <div className="flex-1 flex justify-center">

              <ul className={toggleNav ? 'nav-links  show-menu' : 'nav-links flex w-full'}>
                <div className="mobile-menu-div  my-4">
                  <AiOutlineClose className="menu-icon close-icon" onClick={() => setToggleNav((prev) => !prev)} />
                </div>

                <li className="nav-item "><NavLink className="lg:text-dark lg:font-semibold lg:text-base" to="/">Home</NavLink></li>
                <li className="nav-item"><NavLink to="/store" className="lg:text-dark lg:font-semibold lg:text-base">Go to store</NavLink></li>
                <li className="nav-item"><NavLink to="/contact" className="lg:text-dark lg:font-semibold lg:text-base">Contact Us</NavLink></li>
                <li className="nav-item"><NavLink to="/about" className="lg:text-dark lg:font-semibold lg:text-base">About Us</NavLink></li>
                <li className="nav-item"><NavLink to="/products" className="lg:text-dark lg:font-semibold lg:text-base">Products</NavLink></li>
                <li className="nav-item"><NavLink to="/court-directory" className="lg:text-dark lg:font-semibold lg:text-base">Court Directory</NavLink></li>

                {user !== null && ((user.role === 'admin' || user.role == 'super-admin') && (
                <li className="nav-item">
                  <NavLink to="/admin" className="lg:text-dark lg:font-semibold lg:text-base">    go to admin </NavLink>
                  {' '}
                </li>
                ))}

                <li className="nav-item last">
                  <span><FiUser className="user-icon" /></span>

                  {user === undefined ? <NavLink className="lg:text-dark lg:font-semibold lg:text-base" to="/auth/login">Login</NavLink> : <a onClick={handleLogOut} className="lg:text-dark lg:font-semibold lg:text-base">Log Out</a> }

                </li>

              </ul>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <a href="#survey" className="bg-gray-60 py-1 rounded px-3  lg:text-dark lg:font-semibold lg:text-base text-base font-medium hidden md:block"> Survey</a>

              <NavLink to="/store">
                {/* <NavLink to="/"> */}
                <AiOutlineShopping className="menu-icon text-theme-alt text-3xl" />
              </NavLink>

              <div className="menu-div cart">
                <NavLink to="/carts">

                  <BsCartDash className="menu-icon text-3xl text-theme-alt cart-icon" />
                  <span className="total-amount text-white bold">{counter}</span>

                </NavLink>
              </div>
              <>
                <ButtonSession user={user} handleLogOut={handleLogOut} />

              </>

            </div>
            {/* </div> */}
          </div>

        </div>
        <SearchComponent />
      </nav>
    </>
  );
};

export default NavInfo;

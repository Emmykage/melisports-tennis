import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import { FiUser, FiMenu, FiPauseCircle } from 'react-icons/fi';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { TbLogin2, TbLogout2 } from 'react-icons/tb';
import { MdHome } from 'react-icons/md';
import { Login, LoginOutlined } from '@mui/icons-material';
import { calculateTotal } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
import SearchComponent from './SearchComponent';
import logo from '../../assets/images/logo/melisport_1.png';

import { userProfile } from '../../redux/actions/auth';

import ButtonSession from './components/ButtonSession';

const Nav = ({ store = true }) => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const [stickyNav, setStickyNav] = useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);

  console.log(user);
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
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
          {/* Left: Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setToggleNav(true)}
            >
              <FiMenu />
            </button>
            <NavLink to="/store" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </NavLink>
          </div>

          {/* Middle: Nav Links (Desktop) */}

          {store
            ? (
              <ul className="hidden lg:flex gap-6 text-sm font-medium  text-gray-700">
                <li>
                  <NavLink
                    to="/store"
                    className="hover:text-primary transition-colors"
                  >
                    Store
                  </NavLink>
                </li>
                <li className="group relative">
                  <NavLink
                    to="/racquets?brand=babolat"
                    className="hover:text-primary transition-colors"
                  >
                    Rackets
                  </NavLink>
                  {/* Dropdown */}
                  <div className="absolute left-0 group-hover:flex hidden">
                    <div className="mt-8 flex bg-white gap-8 p-6 bg- shadow-xl rounded-xl">
                      <div>
                        <h4 className="text-gray-900 font-normal mb-2">Tennis</h4>
                        <NavLink
                          to="/racquets"
                          className="block text-gray-600 hover:text-primary"
                        >
                          Babolat
                        </NavLink>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-normal mb-2">Padel</h4>
                        <NavLink
                          to="/padels"
                          className="block text-gray-600 hover:text-primary"
                        >
                          Babolat
                        </NavLink>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-normal mb-2">Badminton</h4>
                        <NavLink
                          to="/badminton"
                          className="block text-gray-600 hover:text-primary"
                        >
                          Babolat
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/apparels"
                    className="hover:text-primary transition-colors"
                  >
                    Apparels
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shoes"
                    className="hover:text-primary transition-colors"
                  >
                    Shoes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bags"
                    className="hover:text-primary transition-colors"
                  >
                    Bags
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/accessories"
                    className="hover:text-primary transition-colors"
                  >
                    Accessories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className="hover:text-primary transition-colors"
                  >
                    Brands
                  </NavLink>
                </li>
                {user?.role === 'admin' && (
                <li>
                  <NavLink
                    to="/admin"
                    className="hover:text-primary transition-colors"
                  >
                    Admin
                  </NavLink>
                </li>
                )}
              </ul>
            )

            : (
              <ul className="hidden lg:flex gap-6 text-sm font-medium  text-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="m"><NavLink to="/store" className="hover:text-primary transition-colors">Go to store</NavLink></li>
                <li className=""><NavLink to="/contact" className="hover:text-primary transition-colors">Contact Us</NavLink></li>
                <li className=""><NavLink to="/about" className="hover:text-primary transition-colors">About Us</NavLink></li>
                <li className=""><NavLink to="/products" className="hover:text-primary transition-colors">Products</NavLink></li>
                <li className=""><NavLink to="/court-directory" className="hover:text-primary transition-colors">Court Directory</NavLink></li>

              </ul>
            )}

          {/* Right: User + Cart */}
          <div className="flex items-center gap-5">
            <a href="#survey" className="bg-gray-60 py-1 rounded px-3  lg:text-dark  hidden md:block"> Survey</a>

            <NavLink to="/" className="text-2xl text-gray-700 hover:text-primary">
              <MdHome />
            </NavLink>
            <NavLink to="/carts" className="relative text-2xl text-gray-700 hover:text-primary">
              <BsCartDash />
              {counter > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs font-semibold rounded-full px-2 py-0.5">
                {counter}
              </span>
              )}
            </NavLink>
            <div>
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <FiUser />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/auth/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <FiUser />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
            toggleNav ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setToggleNav(false)}
        />
        <div
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transform transition-transform ${
            toggleNav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <img src={logo} alt="Logo" className="h-8" />
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={() => setToggleNav(false)}
            />
          </div>
          <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
            <NavLink to="/store" onClick={() => setToggleNav(false)}>
              Store
            </NavLink>
            <NavLink to="/racquets" onClick={() => setToggleNav(false)}>
              Rackets
            </NavLink>
            <NavLink to="/apparels" onClick={() => setToggleNav(false)}>
              Apparels
            </NavLink>
            <NavLink to="/shoes" onClick={() => setToggleNav(false)}>
              Shoes
            </NavLink>
            <NavLink to="/bags" onClick={() => setToggleNav(false)}>
              Bags
            </NavLink>
            <NavLink to="/accessories" onClick={() => setToggleNav(false)}>
              Accessories
            </NavLink>
            <NavLink to="/brands" onClick={() => setToggleNav(false)}>
              Brands
            </NavLink>
            {user && user?.role === 'admin' && (
            <NavLink to="/admin" onClick={() => setToggleNav(false)}>
              Admin
            </NavLink>
            )}
            <div className="border-t pt-4">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <FiUser />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/auth/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <FiUser />
                  Login
                </NavLink>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;

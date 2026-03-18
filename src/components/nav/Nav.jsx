import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  NavLink, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import { FiUser, FiMenu, FiPauseCircle } from 'react-icons/fi';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import { MdHome } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa6';

import logo from '../../assets/images/logo/melisport_1.png';

import { clearSearch } from '../../redux/products/product';

const Nav = ({
  store = true, stickyNav, children, setToggleNav, toggleNav, handleLogOut,
}) => {
  const navigate = useNavigate();
  const { counter } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);

  const storeItems = [
    {
      link: '/store', label: 'Store',
    },
    {
      link: '/racquets',
      label: 'Racquets',
      sub: [{ link: '/tennis', label: 'Tennis' }, { link: '/padels', label: 'Padel' }, { link: '/badminton', label: 'Badminton' }],

    },
    {
      link: '/apparels',
      label: 'Apparels',
    },
    {
      link: '/shoes', label: 'Shoes',
    },
    {
      link: '/bags', label: 'Bags',
    },
    {
      link: '/accessories', label: 'Accessories',
    },

    {
      link: '/brands', label: 'Brands',
    },
    ...(user?.role === 'admin' ? [{ link: '/admin', label: 'Admin' }] : []),
  ];

  const landingNavItem = [
    {
      link: '/', label: 'Home',
    }, {
      link: '/store', label: 'Go to store',
    },
    {
      link: '/contact', label: 'Contact Us',
    },
    {
      link: '/about', label: 'About Us',
    },
    {
      link: '/products', label: 'Product',
    },
    {
      link: '/court-directory', label: 'Court Directory',

    },
    ...(user?.role === 'admin' ? [{ link: '/admin', label: 'Admin' }] : []),
  ];
  const storeMenu = useMemo(() => (
    <ul className="hidden lg:flex gap-6 text-sm font-medium items-center  text-gray-700">
      {storeItems.map(({ link, label, sub }) => (
        <li key={link} className="group relative">
          <a
            onClick={() => {
              dispatch(clearSearch());

              navigate(`${link}`);
            }}
            className="hover:text-primary cursor-pointer transition-colors"
          >
            {label}
          </a>
          {/* Dropdown */}
          {sub
                      && (
                      <div className="absolute left-0 group-hover:flex hidden">
                        <div className="mt-8 flex bg-white gap-8 p-6 bg- shadow-xl rounded-xl">

                          {sub && sub.map((subItem) => (

                            <div>
                              <h4 className="text-gray-900 font-normal mb-2">
                                {' '}
                                {subItem.label}
                              </h4>
                              <NavLink
                                to={`${subItem.link}`}
                                className="block text-gray-600 hover:text-primary"
                              >
                                Babolat
                              </NavLink>
                            </div>

                          )) }
                        </div>

                      </div>
                      )}

        </li>

      ))}
      {user && (user?.role === 'admin' || user?.role === 'super-admin') && (
      <NavLink to="/admin" onClick={() => setToggleNav(false)}>
        Admin
      </NavLink>
      )}

      <NavLink to="/community" className="text-primary rounded-md  px-4 py-2" onClick={() => setToggleNav(false)}>
        CD Programs
      </NavLink>

      {
    }

    </ul>
  ), [store, user]);

  const landingMenu = useMemo(() => (
    <ul className="hidden lg:flex gap-6 text-sm font-medium  text-gray-700">
      {landingNavItem.map((item) => (
        <li>
          <NavLink
            to={item.link}

            className={`hover:text-primary rounded-md transition-colors px-4 py-2${item.link === location.pathname ? 'text-primary' : ''} ${item.link === '/store' && 'font-bold bg-primary text-white hover:!text-gray-300 '}`}
          >
            {item.label}
          </NavLink>
        </li>
      ))}

    </ul>
  ), [store, user]);

  return (
    <>
      <nav className="fixed left-0 right-0 transition-all duration-300 w-full h-auto bg-gray-200 top-0 z-50 shadow-md">
        {!stickyNav && (
        <div className="py-2  px-4  bg-gray-100">

          <div className="flex m-auto justify-between max-w-7xl">

            <span className="text-xs font-medium">
              Free shipping on orders over NGN500,000

            </span>
            <span className="text-xs">
              Help & Service

            </span>
          </div>

        </div>
        )}
        <div>
          {children}

          {/* <SearchBox logo={logo} stickyNav={stickyNav} /> */}

        </div>
        {/* <SearchComponent/> */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
          {/* Left: Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setToggleNav(true)}
            >
              <FiMenu />
            </button>
            {/* <NavLink to="/store" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </NavLink> */}
          </div>

          {/* Middle: Nav Links (Desktop) */}

          {store ? storeMenu : landingMenu }

          {/* Right: User + Cart */}
          <div className="flex items-center gap-5">
            <a href="#survey" className="bg-gray-60 py-1 rounded px-3  lg:text-dark  hidden md:block"> Survey</a>

            <NavLink
              onClick={() => {
                dispatch(clearSearch());
              }}
              to="/"
              className="text-2xl text-gray-700 hover:text-primary"
            >
              <MdHome />
            </NavLink>
            <NavLink
              onClick={() => {
                dispatch(clearSearch());
              }}
              to="/carts"
              className="relative text-2xl text-gray-700 hover:text-primary"
            >
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
                  onClick={() => {
                    dispatch(clearSearch());
                    handleLogOut();
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <FiUser />
                  Logout
                </button>
              ) : (
                <NavLink

                  onClick={() => {
                    dispatch(clearSearch());
                  }}

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
              className="text-2xl cursor-pointer "
              onClick={() => setToggleNav(false)}
            />
          </div>
          <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">

            {store ? storeItems.map((item) => (
              <span
                key={item.link}
                className="w-full cursor-pointer hover:text-primary"

                onClick={() => {
                  dispatch(clearSearch());
                  setToggleNav(false);
                  navigate(item.link);
                }}
              >
                <div className="flex justify-between items-center ">
                  {item.label}

                  {item.sub
                && (
                <span
                  className="p-1 border text-theme"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaChevronRight
                    className={` transform transition-all duration-75 ease-linear ${openDropdown ? 'rotate-90' : 'rotate-0'}`}
                    onClick={(e) => {
                      // e.stopPropagation()
                      setOpenDropdown((prev) => !prev);
                    }}
                  />

                </span>
                )}

                </div>

                {item.sub && (
                <div className={`mt-2 pl-4 border-l overflow-hidden transform transition-all duration-75 ease-linear ${openDropdown ? 'h-auto' : 'h-0'} `}>
                  {item.sub.map((subItem) => (
                    <span

                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(subItem.link);
                        setToggleNav(false);
                      }}
                      className="text-gray-600 hover:text-primary block mt-2"
                    >
                      {subItem.label}
                    </span>
                  ))}
                </div>
                )}
              </span>

            ))
              : landingNavItem.map((item) => (
                <NavLink to={item.link} onClick={() => setToggleNav(false)}>
                  {item.label}
                </NavLink>

              ))}

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

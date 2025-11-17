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
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { MdHome } from 'react-icons/md';
import { Input } from '@mui/material';
import { calculateTotal } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
import SearchComponent from './SearchComponent';
import logo from '../../assets/images/logo/melisport_1.png';

import { userProfile } from '../../redux/actions/auth';
import { getProducts, searchedProducts } from '../../redux/actions/product';
import { nairaFormat } from '../../utils/nairaFormat';
import { clearSearch } from '../../redux/products/product';

const Nav = ({ store = true }) => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const [stickyNav, setStickyNav] = useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const [query] = useSearchParams();
  const { location } = window;

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

  const storeItems = [
    {
      link: '/store', label: 'Store',
    },
    {
      link: '/racquets',
      label: 'Rackets',
      sub: [{ link: '/racquets', label: 'Raquets' }, { link: '/padels', label: 'Padel' }, { link: '/badminton', label: 'Badminton' }],

    },
    {
      link: '/apparels',
      label: 'Apparels',
    },
    {
      link: '/shoes', label: 'Shoe',
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
    <ul className="hidden lg:flex gap-6 text-sm font-medium  text-gray-700">
      {storeItems.map(({ link, label, sub }) => (
        <li className="group relative">
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

    </ul>
  ), [store, user]);

  const landingMenu = useMemo(() => (
    <ul className="hidden lg:flex gap-6 text-sm font-medium  text-gray-700">
      {landingNavItem.map((item) => (
        <li>
          <NavLink
            to={item.link}

            className="hover:text-primary transition-colors"
          >
            {item.label}
          </NavLink>
        </li>
      ))}

    </ul>
  ), [store, user]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
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
        <div>
          <SearchBox />

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
            <NavLink to="/store" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </NavLink>
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
              className="text-2xl cursor-pointer"
              onClick={() => setToggleNav(false)}
            />
          </div>
          <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">

            {store ? storeItems.map((item) => (
              <NavLink
                onClick={() => {
                  dispatch(clearSearch());
                  setToggleNav(false);
                }}
                to={item.link}
              >
                {item.label}
              </NavLink>

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

export function SearchBox() {
  const timeoutRef = useRef(null);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');

  const isSearchPage = pathname === '/search_page';

  const { searched_products } = useSelector((state) => state.products);

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (isSearchPage) return;

    navigate(`/search_page?search=${search}`);
    dispatch(clearSearch());

    // setShowSearchList(false);
  };

  const handlesearchInput = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\s+/g, ' ');
    setSearch(cleanedValue);

    isSearchPage && setSearchParams({ search: value });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(searchedProducts({ search: cleanedValue }));
    }, 1000);
  };

  const [showSearchList, setShowSearchList] = useState(false); // State variable to control visibility

  useEffect(() => {
    setShowSearchList(searched_products.length > 0);
  },
  [searched_products]);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      !isSearchPage && dispatch(clearSearch());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="">
      <Paper
        ref={searchRef}
        className="border-b"
        component="form"
        onSubmit={handleSearch}
        sx={{
          boxShadow: 'none',
          position: 'relative',
          p: '2px 40px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          m: 'auto',
        }}
      >
        <div className="max-w-7xl flex items-center m-auto w-full">

          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              pl: 2,
              border: 'none',
              boxShadow: 'none',
              borderLeft: '1px solid rgba(184, 184, 184, 0.6)',
              p: '4px 4px',
              '& .MuiInputBase-input': { paddingLeft: '16px' },
              '& .MuiInputBase-input:focus': {
                outline: 'none',
                border: 'none',
              },
              '& .MuiInputBase-input:hover': { outline: 'none', border: 'none' },
              '& .MuiInputBase-input:focus': { outline: 'none' },
            }}
            onChange={handlesearchInput}
            value={isSearchPage ? query : search}

            placeholder="Search Products"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
          </IconButton>

        </div>

        <Paper
          className=""
          sx={{
            display: showSearchList && !isSearchPage ? 'block' : 'none', position: 'absolute', width: '100%', top: '100%', left: 0, zIndex: 50,
          }}
        >

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4  gap-y-6 p-4 max-w-7xl m-auto mt-4 max-h-[600px] overflow-auto no-scroll">

            {searched_products && searched_products?.map((item) => (
              <div
                className="border shadow rounded-lg pb-4"
                onClick={() => {
                  navigate(`/productdetails/${item?.id}`);
                  dispatch(clearSearch());
                }}
              >
                <img src={item.photo_urls?.[0]} alt="" className="h-52 w-full rounded-lg object-contain" />
                <p className="px-4 mt-4 capitalize font-semibold">{item?.name}</p>
                <p className="px-4">{nairaFormat(item?.price)}</p>
              </div>
            ))}

          </div>

        </Paper>
      </Paper>
    </div>
  );
}

export default Nav;

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

const Nav = () => {
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
      <nav className="bg-gray-300">

        <div className={`${stickyNav} navbar`}>
          <div className="mobile-menu-div">
            <a className="menu">
              <FiMenu className="menu-icon" onClick={() => setToggleNav((prev) => !prev)} />
            </a>
          </div>
          <div className="logo ">
            <NavLink className="img-div" to="/store">
              <img src={logo} alt="" />
            </NavLink>
          </div>

          <div className="nav-div flex flex-wrap">
            <div className="flex-1 flex">

              <ul className={toggleNav ? 'nav-links  show-menu ' : 'nav-links'}>
                <div className="mobile-menu-div  my-4">
                  <AiOutlineClose className="menu-icon close-icon" onClick={() => setToggleNav((prev) => !prev)} />
                </div>

                <li className="nav-item"><NavLink to="/store" className="lg:text-dark lg:font-semibold lg:text-base">Store</NavLink></li>
                <li className="nav-item">
                  <NavLink to={`/racquets?brand=${'babolat'}`} className="lg:text-dark lg:font-semibold lg:text-base">Rackets </NavLink>
                  <div className="link-items flex">
                    <div className="">
                      <h3 className="text-lg tracking-wider font-medium text-theme-alt">
                        Rackets &
                        <br />
                        {' '}
                        Paddles
                      </h3>
                    </div>
                    <ul className="border-b lg:border-none">

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>  Tennis Rackets </p>
                      </h4>
                      <li className="pl-3 p-0 text-sm lg:text-dark font-semibold">
                        <NavLink to="/racquets">Babolat</NavLink>
                      </li>

                    </ul>
                    <ul className="border-b lg:border-none">
                      <h4 className="text-base font-semibold lg:text-black">
                        <p>  Padel Rackets </p>

                      </h4>
                      <li className="pl-3 p-0 text-sm lg:text-dark font-semibold">
                        <NavLink to="/padels">Babolat</NavLink>
                      </li>

                    </ul>
                    <ul className="border-">

                      <h4 className="text-base font-semibold lg:text-black">
                        <p to="/badminton">  Badminton Rackets </p>
                      </h4>
                      <li className="pl-3 p-0 lg:text-dark font-semibold">
                        <NavLink to="/badminton">Babolat</NavLink>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="nav-item">

                  <NavLink to="/apparels" className="lg:text-dark lg:font-semibold lg:text-base">Apparels</NavLink>

                  <div className="link-items flex">
                    <div>
                      <h3 className="text-lg tracking-wider font-medium text-theme-alt">Apparels</h3>
                    </div>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black ">
                        <p to="#">  Tennis Men's Apparels </p>
                      </h4>
                      <li className="pl-3 p-0 lg:text-dark font-semibold">
                        <NavLink href="/apparels?type=men&brand=babolat">Babolat</NavLink>
                      </li>
                    </ul>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>   Tennis Women's Apparel </p>

                      </h4>
                      <li>
                        <NavLink to="/apparels?type=women&brand=babolat" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/shoes" className="lg:text-dark lg:font-semibold lg:text-base">Shoes</NavLink>
                  <div className="link-items">
                    <div>
                      <h3 className="text-lg tracking-wider font-medium text-theme-alt">Shoes</h3>
                    </div>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>   Men's Shoes </p>
                      </h4>
                      <li><NavLink to="/shoes?type=men&brand=babolat" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>

                    </ul>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>   Women's Shoes </p>
                      </h4>
                      <li><NavLink to="/shoes?type=women&brand=babolat" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>

                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/bags" className="lg:text-dark lg:font-semibold lg:text-base">Bags</NavLink>
                  <div className="link-items flex">
                    <div>
                      <h3 className="text-lg tracking-wider font-medium text-theme-alt">
                        Racket Holders &
                        <br />
                        {' '}
                        Backpacks
                      </h3>
                    </div>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>  Racket Holder</p>
                      </h4>
                      <li><NavLink to="/bags?type=babolat&brand=babolat" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>

                    </ul>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p>  Backpacks</p>
                      </h4>
                      <li><NavLink href="/bags?type=backpack" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>

                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/accessories" className="lg:text-dark lg:font-semibold lg:text-base">Acccessories</NavLink>
                  <div className="link-items flex">
                    <div>
                      <h3 className="text-lg tracking-wider font-medium text-theme-alt">
                        Sports &
                        <br />
                        {' '}
                        Court Accessories
                      </h3>
                    </div>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p> Sports Accessories </p>
                      </h4>
                      <li><NavLink to="/accessories?type=sports" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>
                    </ul>
                    <ul>

                      <h4 className="text-base font-semibold lg:text-black">
                        <p> Courts Accessories </p>
                      </h4>
                      <li><NavLink to="/accessories?type=court" className="pl-3 p-0 lg:text-dark font-semibold">Babolat</NavLink></li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/brands" className="lg:text-gray-800 lg:font-semibold lg:text-base">Brands</NavLink>

                </li>

                {user && ((user?.role === 'admin' || user?.role === 'super-admin') && (
                <li className="nav-item lg:text-gray-800 lg:font-semibold lg:text-base">
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
            <div className="flex  gap-3 justify-between items-center py-2.5">
              <NavLink to="/">
                <MdHome className="menu-icon text-theme-alt text-4xl" />
              </NavLink>
              <div className="menu-div cart">

                <NavLink to="/carts">

                  <BsCartDash className="menu-icon text-3xl cart-icon text-theme-alt" />
                  <span className="total-amount text-white bold">{counter}</span>

                </NavLink>
              </div>
              <div className=" items-center text-black mobile-display hidden lg:flex font-medium">

                <>
                  <ButtonSession user={user} handleLogOut={handleLogOut} />

                </>

              </div>

            </div>
          </div>

        </div>
        <SearchComponent />
      </nav>
    </>
  );
};

export default Nav;

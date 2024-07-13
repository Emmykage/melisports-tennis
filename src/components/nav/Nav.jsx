import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import { FiUser, FiMenu } from 'react-icons/fi';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
// import {  } from 'react';
import { calculateTotal } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
import SearchComponent from './SearchComponent';
import { closeNav, openNav } from '../../redux/modal/nav';
import logo from '../../assets/images/logo/melisport_1.png';
import { userLog } from '../../redux/user/user';
import { getProducts } from '../../redux/actions/product';

const Nav = () => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const [stickyNav, setStickyNav] = useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { toggleNav } = useSelector((state) => state.navToggle);

  const toggleScrollNav = (e) => {
    if (window.scrollY >= 120) {
      setStickyNav('sticky-nav');
    } else {
      setStickyNav('');
    }
  };
  useEffect(() => {
    dispatch(getProducts());
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

        <div className={`${stickyNav} navbar`}>
          <div className="mobile-menu-div">
            <a className="menu">
              <FiMenu className="menu-icon" onClick={() => dispatch(openNav())} />
            </a>
          </div>
          <div className="logo ">
            <NavLink className="img-div" to="/store">
              <img src={logo} alt="" />
            </NavLink>
          </div>

          <div className="nav-div flex">
            <div className="flex-1 flex">

              <ul className={toggleNav ? 'nav-links  show-menu' : 'nav-links'}>
                <div className="mobile-menu-div  my-4">
                  <AiOutlineClose className="menu-icon close-icon" onClick={() => dispatch(closeNav())} />
                </div>

                <li className="nav-item"><NavLink to="/store">Home</NavLink></li>
                <li className="nav-item">
                  <NavLink to="/racquets" className="hey">Rackets </NavLink>
                  <div className="link-items flex">
                    <div className="">
                      <h3>
                        Rackets &
                        <br />
                        {' '}
                        Paddles
                      </h3>
                    </div>
                    <ul>

                      <h4>Tennis Rackets</h4>
                      <li><NavLink to="/racquets">Babolat</NavLink></li>

                    </ul>
                    <ul>
                      <h4>Padel Rackets</h4>
                      <li><NavLink to="/padels">Babolat</NavLink></li>

                    </ul>
                    <ul>

                      <h4>Badminton Rackets</h4>
                      <li><NavLink to="/badminton">Babolat</NavLink></li>

                    </ul>
                  </div>
                </li>
                <li className="nav-item">

                  <NavLink to="/apparels">Apparels</NavLink>

                  <div className="link-items flex">
                    <div>
                      <h3>Apparels</h3>
                    </div>
                    <ul>

                      <h4>Tennis Men's Apparels</h4>
                      <li><a href="#">Babolat</a></li>
                      {/* <li><a href="#">Wilson</a></li> */}
                    </ul>
                    <ul>

                      <h4>Tennis Women's Apparel</h4>
                      <li><a href="#">Babolat</a></li>
                      {/* <li><a href="#">Wilson</a></li> */}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/shoes">Shoes</NavLink>
                  <div className="link-items">
                    <div>
                      <h3>Shoes</h3>
                    </div>
                    <ul>

                      <h4>Men's Shoes</h4>
                      <li><a href="#">Babolat</a></li>
                      {/* <li><a href="#">Wilson</a></li> */}
                    </ul>
                    <ul>

                      <h4>Women's Shoes</h4>
                      <li><a href="/">Babolat</a></li>
                      {/* <li><a href="/">Wilson</a></li> */}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/bags">Bags</NavLink>
                  <div className="link-items flex">
                    <div>
                      <h3>Bags</h3>
                    </div>
                    <ul>

                      <h4>Men's Shoes</h4>
                      <li><a href="#">Babolat</a></li>
                      {/* <li><a href="#">Wilson</a></li> */}
                    </ul>
                    <ul>

                      <h4>Women's Shoes</h4>
                      <li><a href="/">Babolat</a></li>
                      {/* <li><a href="/">Wilson</a></li> */}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/accessories">Acccessories</NavLink>
                  <div className="link-items flex">
                    <div>
                      <h3>Shoes</h3>
                    </div>
                    <ul>

                      <h4>Men's Shoes</h4>
                      <li><a href="#">Babolat</a></li>
                      {/* <li><a href="#">Wilson</a></li> */}
                    </ul>
                    <ul>

                      <h4>Women's Shoes</h4>
                      <li><a href="/">Babolat</a></li>
                      {/* <li><a href="/">Wilson</a></li> */}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/brands">Brands</NavLink>
                  {/* <div className="link-items flex">
                  <div>
                    <h3>
                      Sport Brands
                    </h3>
                  </div>
                  <ul>

                    <h4>Tennis Racquets</h4>
                    <li><a href="/brands">Babolat</a></li>
                  </ul>
                  <ul>

                    <h4>Badminton Racquets</h4>
                    <li><a href="/brands">Babolat</a></li>
                  </ul>
                </div> */}
                </li>

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
            <div className="flex justify-between items-center ">
              <div className="user mobile-display ">
                {user == undefined ? <NavLink to="/auth/login">Login</NavLink> : <a onClick={handleLogOut}>Log Out</a> }

                <span><FiUser className="user-icon" /></span>

              </div>

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

export default Nav;

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import { FiUser, FiMenu } from 'react-icons/fi';
import '../nav/nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineShopping } from 'react-icons/ai';
import { getCartSum, getUserCart } from '../../redux/actions/cart';
import SearchComponent from '../nav/SearchComponent';
import logo from '../../assets/images/logo/melisport_1.png';
import { userProfile } from '../../redux/actions/auth';
import ButtonSession from '../nav/components/ButtonSession';
import Nav from '../nav/Nav';
import { SearchBox } from '../nav/SearchBox';

const Header = ({ store }) => {
  const navigate = useNavigate();
  const { counter, update } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const [stickyNav, setStickyNav] = useState('');

  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getCartSum());
  }, []);

  useEffect(() => {
    const layoutDiv = document.querySelector('.main');
    layoutDiv?.addEventListener('scroll', toggleScrollNav);
    return () => layoutDiv?.removeEventListener('scroll', toggleScrollNav);
  }, []);

  const toggleScrollNav = (e) => {
    if (window.scrollY >= 120) {
      setStickyNav('sticky-nav');
    } else {
      setStickyNav('');
    }
  };
  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getCartSum());
    window.addEventListener('scroll', toggleScrollNav);
  }, [update]);

  const handleLogOut = () => {
    localStorage.removeItem('meli_auth');
    dispatch(userProfile());
    navigate('/auth/login');
  };

  return (
    <>
      <Nav store={store} stickyNav={stickyNav} toggleNav={toggleNav} handleLogOut={handleLogOut} setToggleNav={setToggleNav}>
        <SearchBox logo={logo} stickyNav={stickyNav} />
      </Nav>
    </>
  );
};

export default Header;

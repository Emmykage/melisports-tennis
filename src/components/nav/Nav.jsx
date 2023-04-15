import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import {FiUser} from "react-icons/fi"
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { calculateTotal, updater } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
import SearchComponent from './SearchComponent';
import { closeNav, openNav } from '../../redux/modal/nav';
import logo from "../../assets/images/logo/melisport_1.png"
import { userLog } from '../../redux/user/user';




const auth = localStorage.getItem("meli_auth")
let meli_auth
auth && (meli_auth = JSON.parse(auth) )


const Nav = () => {

  
// console.log(auth)

  const navigate = useNavigate()
  const { counter, cartItems, update } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.user)
  console.log(user)
  console.log(update)
  const dispatch = useDispatch()
  console.log(counter, cartItems)
  const { toggleNav} = useSelector((state) => state.navToggle)
  useEffect(()=>{
    dispatch(getCarts())
    dispatch(updater())
    dispatch(calculateTotal())
  },[] )
  // const showNav = () =>{
  //   dispatch(closeNav())

  // }
  const handleLogOut = () => {
    localStorage.setItem('meli_auth', '')
    dispatch(userLog())
    navigate('/auth/login')
  }
  return (
    <div>
      <nav>
      
        <div className="navbar">
          <div className='mobile-menu-div'>
            <a className='menu'>
              <FiMenu className='menu-icon' onClick={() => dispatch(openNav())}/>
            </a>
          </div>
          <div className="logo">
            
          <div className='img-div'>
            <img src={logo} alt="" />
           

            </div>
          </div>

          <div className="nav-div flex-center space">

            <ul className=
            {toggleNav? "nav-links  show-menu" : "nav-links"}>
              <div  className='mobile-menu-div  m-v4'>
              <AiOutlineClose  className='menu-icon close-icon' onClick={() => dispatch(closeNav())} />
              </div>
              
              <li className="nav-item"><NavLink to="/">Home</NavLink></li>
              <li className="nav-item">
                <NavLink to="/racquets" className={"hey"}>Racquets </NavLink>
                <div className="link-items flex">
                  <div className=''>
                    <h3>
                      Racquets &
                      <br />
                      {' '}
                      Paddles
                    </h3>
                  </div>
                  <ul>

                    <h4>Tennis Racquets</h4>
                    <li><a href="#">Babolat</a></li>
                    <li><a href="#">Wilson</a></li>
                  </ul>
                  <ul>

                    <h4>Badminton Racquets</h4>
                    <li><a href="#">Babolat</a></li>
                    <li><a href="#">Wilson</a></li>
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
                    <li><a href="#">Wilson</a></li>
                  </ul>
                  <ul>

                    <h4>Tennis Women's Apparel</h4>
                    <li><a href="#">Babolat</a></li>
                    <li><a href="#">Wilson</a></li>
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
                    <li><a href="#">Wilson</a></li>
                  </ul>
                  <ul>

                    <h4>Women's Shoes</h4>
                    <li><a href="/">Babolat</a></li>
                    <li><a href="/">Wilson</a></li>
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
                    <li><a href="#">Wilson</a></li>
                  </ul>
                  <ul>

                    <h4>Women's Shoes</h4>
                    <li><a href="/">Babolat</a></li>
                    <li><a href="/">Wilson</a></li>
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
                    <li><a href="#">Wilson</a></li>
                  </ul>
                  <ul>

                    <h4>Women's Shoes</h4>
                    <li><a href="/">Babolat</a></li>
                    <li><a href="/">Wilson</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <NavLink href="#Home">Brands</NavLink>
                <div className="link-items flex">
                  <div>
                    <h3>
                      Sport Brands
                    </h3>
                  </div>
                  <ul>

                    <h4>Tennis Racquets</h4>
                    <li><a href="/">Babolat</a></li>
                    <li><a href="/">Wilso</a></li>
                  </ul>
                  <ul>

                    <h4>Badminton Racquets</h4>
                    <li><a href="/">Babolat</a></li>
                    <li><a href="/">Wilso</a></li>
                  </ul>
                </div>
              </li>
              
             
            
              
              {auth && ((meli_auth.user.role === "admin" || meli_auth.user.role == undefined) ?  <li  className="nav-item"><NavLink to="/admin">    go to admin </NavLink>        </li> : " ")}
              {/* {meli_auth.user.role ?  <li  className="nav-item"><NavLink to="/admin">    go to admin </NavLink>        </li> : " "} */}
              <li className='nav-item last'>
              <span><FiUser className='user-icon'/></span>


{auth ?   <a onClick={handleLogOut}>Log Out</a> :   <NavLink to="/auth/login">Login</NavLink> }

</li>
              

            </ul>
            <div className='flex-space'>
              <div className='user mobile-display '>
                {auth ?   <a onClick={handleLogOut}>Log Out</a> :   <NavLink to="/auth/login">Login</NavLink> }
              
                <span><FiUser className='user-icon'/></span>

              </div>

      
            <div className='menu-div cart'>
              <NavLink to="/carts">

            
              <BsCartDash className='menu-icon cart-icon'/>
              <span className="total-amount color-white bold">{counter}</span>

              </NavLink>
            </div>
            </div>
          </div>

        </div>
        <SearchComponent/>
      </nav>
    </div>
  );
};

export default Nav;

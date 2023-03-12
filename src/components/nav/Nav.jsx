import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import {FiUser} from "react-icons/fi"
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { calculateTotal } from '../../redux/cart/cart';
import { getCarts } from '../../redux/actions/cart';
const Nav = () => {
  const auth = localStorage.getItem("meli_auth")
  const meli_auth = JSON.parse(auth)
  // console.log(meli_auth.user.role)
  


  const navigate = useNavigate()
  const { counter, cartItems, update } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  
  // const style = { BackgroundColor: "white", color: "red", fontSize: "1.5em" }
  const [openNav, setOpenNav] = useState(false);
  useEffect(()=>{
    dispatch(getCarts())
    dispatch(calculateTotal())
  },[update] )
  const showNav = () =>{
setOpenNav(!openNav)
  }
  const handleLogOut = () => {
    localStorage.setItem('meli_auth', '')
    navigate('/auth/login')
  }
  return (
    <div>
      <nav>
      
        <div className="navbar">
          <div className='menu-div'>
            <a className='menu'>
              <FiMenu className='menu-icon' onClick={showNav}/>
            </a>
          </div>
          <div className="logo">
            <NavLink to="/">
              MeliSports
            </NavLink>
          </div>

          <div className="nav-div flex-center space">

            <ul className=
            {openNav? "nav-links  show-menu" : "nav-links"}>
              <div  className='menu-div m-v4'>
              <AiOutlineClose  className='menu-icon ' onClick={showNav} />
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
                <NavLink to="/bags">Bags</NavLink>
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
              {meli_auth && (meli_auth.user.role ?  <li  className="nav-item"><NavLink to="/admin">    go to admin </NavLink>        </li> : " ")}
              {/* {meli_auth.user.role ?  <li  className="nav-item"><NavLink to="/admin">    go to admin </NavLink>        </li> : " "} */}

              

            </ul>
            <div className='flex-space'>
              <div className='user '>
                {auth ?   <span onClick={handleLogOut}>Log Out</span> :   <NavLink to="/auth/login">Login</NavLink> }
              
                <span><FiUser className='user-icon'/></span>

              </div>

      
            <div className='cart'>
              <NavLink to="/carts">

            
              <BsCartDash className='cart-icon'/>
              <span className="total-amount color-white bold">{counter}</span>

              </NavLink>
            </div>
            </div>
          </div>

        </div>
        <div>
          <form>
            <div className="search-div">
              <input type="text" />
              <button type="submit">search </button>

            </div>

          </form>
        </div>
      </nav>
    </div>
  );
};

export default Nav;

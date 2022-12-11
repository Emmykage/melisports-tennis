import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsCartDash } from 'react-icons/bs';
import './nav.css';
import { useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
const Nav = () => {
  const { amount } = useSelector((state) => state.cart);
  const style = { color: "white", fontSize: "1.5em" }
  const [openNav, setOpenNav] = useState(false);
  console.log(amount)
  const showNav = () =>{
setOpenNav(!openNav)
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

          <div className="nav-div flex-center">

            <ul className=
            {openNav? "nav-links  show-menu" : "nav-links"}>
              <div  className='menu-div m-v4'>
              <AiOutlineClose  className='menu-icon ' onClick={showNav} />
              </div>
              
              <li className="nav-item"><NavLink to="/">Home</NavLink></li>
              <li className="nav-item">
                <NavLink to="/racquets">Racquets </NavLink>
                <div className="link-items flex">
                  <div>
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
                    <li><a href="#">Wilso</a></li>
                  </ul>
                  <ul>

                    <h4>Badminton Racquets</h4>
                    <li><a href="#">Babolat</a></li>
                    <li><a href="#">Wilso</a></li>
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
                    <li><a href="#">Wilso</a></li>
                  </ul>
                  <ul>

                    <h4>Tennis Women's Apparel</h4>
                    <li><a href="#">Babolat</a></li>
                    <li><a href="#">Wilso</a></li>
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
                    <li><a href="/">Wilso</a></li>
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
                    <li><a href="/">Wilso</a></li>
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

            </ul>
            <div className='cart'>
              <NavLink to="/carts">

            
              <BsCartDash className='cart-icon'/>
              <span className="total-amount">{amount}</span>

              </NavLink>
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

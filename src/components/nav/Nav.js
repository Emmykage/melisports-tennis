import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './nav.css';
import { useSelector } from 'react-redux';

const Nav = () => {
  const { amount } = useSelector((state) => state.cart);
  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="logo">
            <NavLink to="/">
              MeliSports
            </NavLink>
          </div>

          <div className="nav-div flex-center">

            <ul className="nav-links">
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
            <div>
              <AiOutlineShoppingCart />
              <div className="amount-container">
                <p className="total-amount">{amount}</p>

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

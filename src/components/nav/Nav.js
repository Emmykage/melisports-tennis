import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

const Nav = () => (
  <div>
    <nav>
      <div className="navbar">
        <div className="logo">
          <NavLink href="#Home">
            MeliSports
          </NavLink>
        </div>

        <div className="nav-div">

          <ul className="nav-links">
            <li className="nav-item"><NavLink to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/products">Apparels</NavLink></li>
            <li className="nav-item"><NavLink href="#Home">Racquets</NavLink></li>
            <li className="nav-item"><NavLink href="#Home">Shoes</NavLink></li>
            <li className="nav-item"><NavLink href="#Home">Brands</NavLink></li>

          </ul>
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

export default Nav;

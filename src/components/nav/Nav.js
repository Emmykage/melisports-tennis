import React from 'react';
import './nav.css';

const Nav = () => (
  <div>
    <nav>
      <div className="navbar">
        <div className="logo">
          <a href="#Home">
            MeliSports
          </a>
        </div>

        <div className="nav-div">

          <ul className="nav-links">
            <li className="nav-item"><a href="#Home">Home</a></li>
            <li className="nav-item"><a href="#Home">Apparels</a></li>
            <li className="nav-item"><a href="#Home">Racquets</a></li>
            <li className="nav-item"><a href="#Home">Shoes</a></li>
            <li className="nav-item"><a href="#Home">Brands</a></li>

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

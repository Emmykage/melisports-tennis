import React from 'react'
import './nav.css'

const Nav = () => {
  return (
    <div>
        <nav>
            <div className='navbar'>
            <div className='logo'>
            <a>
              MeliSports
            </a>
            </div>
           
            <div className='nav-div'>


           
            <ul className='nav-links'>
                <li className='nav-item'><a>Home</a></li>
                <li className='nav-item'><a>Apparels</a></li>
                <li className='nav-item'><a>Racquets</a></li>
                <li className='nav-item'><a>Shoes</a></li>
                <li className='nav-item'><a>Brands</a></li>


            </ul>
            </div>
            </div>
            <div><form>
              <div className='search-div'>
              <input type='text'  />
              <button type='submit'>search </button>

              </div>
            
              </form></div>
        </nav>
    </div>
  )
}

export default Nav
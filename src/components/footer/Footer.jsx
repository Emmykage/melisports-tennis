import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="m-auto footer-container flex gap-3 my-10 ">
      <div>
        <h4 className="text-2xl text-center">MeliSport</h4>
        <p className="text-center">
          For over 10 years we have been dedicated to providing an incomparable
          collection of tennis and racqet sport collection
        </p>

      </div>
      <div>
        <h4>RESOURCES</h4>
        <ul>
          {/* <li>Membership</li> */}
          <li>
            <NavLink to="/auth/login" className="no-underline text-sm">
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/return_policy" className="no-underline text-sm">
              Return Policy
            </NavLink>
            {' '}

          </li>
          <li>
            <NavLink to="/shipping_policy" className="no-underline text-sm">
              Shipping Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms_of_service" className="no-underline text-sm">Terms of Service</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/privacy_policy" className="no-underline text-sm">Privacy Policy</NavLink>
          </li>
          {/* <li>
            <NavLink to={"privacy_policy"}>
            Promos & Coupons
            </NavLink>
           </li> */}
          {/* <li>Racquet Trade-In</li> */}
        </ul>
      </div>
      <div>
        <h4> CONTACT US</h4>
        <p>
          Phone: +234-7064334160
          {' '}
          <br />
          Mon-Friday 9am - 5pm WAT
          {' '}
          <br />
          <a href="mailto:info@melisports.com"> info@melisports.com </a>

          {' '}
          <br />
          Gift Cards
        </p>

      </div>
      <div>
        <ul>
          <h4>Connect With Us</h4>
          <li>
            <a href="https://web.facebook.com/melisports">Facebook</a>
            {' '}
          </li>
          <li>
            {' '}
            <a href="https://www.instagram.com/melisports/">Instagram</a>
          </li>
          {/* <li>Youtube</li> */}
          <li>
            <a href="https://twitter.com/MeliSports"> Twitter</a>
            {' '}
          </li>
          {/* <li>TP Blog</li> */}

        </ul>
      </div>
    </div>
    <div className="bg-white text-center text-gray">
      Vortech
      <a href="" />
    </div>
  </footer>
);

export default Footer;

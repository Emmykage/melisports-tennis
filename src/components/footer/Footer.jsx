import React from 'react';
import './footer.css';

const Footer = () => (
  <footer>
    <div className="m-auto footer-container flex-center">
      <div>
        <h3>MeliSport</h3>
        <p>
          for over 10 years we have been dedicated to providing an incomparable
          collection of tennis and racqet sport collection
        </p>

      </div>
      <div>
        <h4>Resources</h4>
        <ul>
          <li>Membership</li>
          <li>My Account</li>
          <li>Return Policy</li>
          <li>Shipping Policy</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Promos & Coupons</li>
          <li>Racquet Trade-In</li>
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
          <li><a href='https://web.facebook.com/melisports'></a> Facebook</li>
          <li> <a href='https://www.instagram.com/melisports/'></a>Instagram</li>
          {/* <li>Youtube</li> */}
          <li><a href='https://twitter.com/MeliSports'> Twitter</a> </li>
          {/* <li>TP Blog</li> */}

        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;

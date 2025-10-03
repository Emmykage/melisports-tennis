import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo/melisport_3.png';

const Footer = () => (
  <footer className="bg-theme text-light px-6 pt-10">
  <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4 sm:grid-cols-2">
    
    {/* Logo & About */}
    <div className="text-center md:text-left">
      <NavLink to="/" className="inline-block">
        <img src={logo} alt="Meli Sports logo" className="w-28 mx-auto md:mx-0" />
      </NavLink>
      <p className="mt-4 text-sm text-gray-200 leading-relaxed">
        For over 10 years we’ve been dedicated to providing an unmatched
        collection of tennis and racquet sport equipment.
      </p>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Resources</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <NavLink to="/auth/login" className="hover:text-primary-light transition">
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/return_policy" className="hover:text-primary-light transition">
            Return Policy
          </NavLink>
        </li>
        <li>
          <NavLink to="/shipping_policy" className="hover:text-primary-light transition">
            Shipping Policy
          </NavLink>
        </li>
        <li>
          <NavLink to="/terms_of_service" className="hover:text-primary-light transition">
            Terms of Service
          </NavLink>
        </li>
        <li>
          <NavLink to="/privacy_policy" className="hover:text-primary-light transition">
            Privacy Policy
          </NavLink>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
      <p className="text-sm space-y-2">
        <a href="tel:+2347038723093" className="block hover:text-primary-light transition">
          Phone: +234-703 872 3093
        </a>
        <span className="block">Mon–Fri, 9am – 5pm WAT</span>
        <a href="mailto:info@melisports.com" className="block hover:text-primary-light transition">
          info@melisports.com
        </a>
      </p>
    </div>

    {/* Social */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="https://web.facebook.com/melisports" target="_blank" rel="noreferrer" className="hover:text-primary-light transition">
            Facebook
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/melisports/" target="_blank" rel="noreferrer" className="hover:text-primary-light transition">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://twitter.com/MeliSports" target="_blank" rel="noreferrer" className="hover:text-primary-light transition">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://youtube.com/@MeliSportss" target="_blank" rel="noreferrer" className="hover:text-primary-light transition">
            YouTube
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="mt-10 border-t border-white/20 py-4 text-center text-sm text-gray-300">
    <p>
      © {new Date().getFullYear()} MeliSports. Built by 
      <span className="font-medium text-white hover:text-primary-light ml-1">Vortech</span>
    </p>
  </div>
</footer>

);

export default Footer;

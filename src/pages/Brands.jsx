import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import babolat from '../assets/images/product-brands/Babolat-Logo.jpg';
import NTF from '../assets/images/product-brands/ntf-logo.jpeg';
import MeliJouer from '../assets/images/product-brands/melijouer.jpg';
import Nav from '../components/nav/Nav';

const Brands = () => (
  <>
    <Nav />
    <div className="section-container h-fit">

      <h2>Our Top Brands</h2>
      <div className="grid grid-cols-3 gap-y-5">
        <div className="box-shadow text-center h-72 my-2"><img src={babolat} alt="" className="w-full h-full" /></div>
        <div className="box-shadow text-center h-72 bg-white my-2"><img src={NTF} alt="ntf logo" className="w-full h-full" /></div>
        <div className="box-shadow text-center h-72 bg-white my-2"><img src={MeliJouer} alt="" className="w-full h-full" /></div>
      </div>
    </div>
  </>

);

export default Brands;

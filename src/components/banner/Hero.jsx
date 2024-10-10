import React from 'react';
import IMG_BANNER from '../../assets/images/banner/banner.jpg';
import './banner.css';

const Hero = ({ image, title }) => (
  <div className="relative product-banner hero-mid">
    <div className="card-img">
      <img src={image} alt="" />

    </div>
    <div className="banner overlay flex justify-center items-center">

      {title && (<h2 className="bg-theme/30 tracking-wider rounded text-2xl text-light py-4 px-16">{title}</h2>
      )}

    </div>

  </div>
);

export default Hero;

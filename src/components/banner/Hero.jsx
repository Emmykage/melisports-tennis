import React from 'react';
import IMG_BANNER from '../../assets/images/banner/banner.jpg';
import './banner.css';

const Hero = ({ image, title }) => (
  <div className="relative product-banner hero-mid">
    <div className="card-img">
      <img src={image} alt="" />

    </div>
    <div className="banner overlay">

      {title && (<h2 className="text-white bg-lucent py-1 px-6">{title}</h2>
      )}

    </div>

  </div>
);

export default Hero;

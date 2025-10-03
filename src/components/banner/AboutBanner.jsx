import React from 'react';
import './banner.css';

export const AboutBanner = () => (
  <div className="relative bg-cover bg-center hero flex items-center justify-center min-h-[60vh] px-4"
     style={{ backgroundImage: "url('/assets/Banner_Recap2022.avif')" }}>
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl text-center text-white p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg animate-fadeIn">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
    <p className="text-base text-white md:text-lg leading-relaxed">
      Welcome to <span className="font-semibold text-primary -300">Melisports</span>, 
      your ultimate destination for top-tier sports equipment and unparalleled 
      services right here in Nigeria! At Melisports, we're more than just a sports 
      store—we're your dedicated partner in elevating your athletic experience.
    </p>
  </div>
</div>
);
export default AboutBanner;

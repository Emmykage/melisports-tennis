import React from 'react';
import Babolat from '../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../../assets/images/logo/melisport_one.png';

const BrandsSponsorComponents = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Our Partners
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
        {/* Sponsor 1 */}
        <div className="flex justify-center items-center">
          <img
            src={Babolat}
            alt="Babolat"
            className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </div>

        {/* Sponsor 2 */}
        <div className="flex justify-center items-center">
          <img
            src={melisport}
            alt="MeliSports"
            className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </div>

        {/* Add more sponsors here if needed */}
      </div>
    </div>
  </section>
);

export default BrandsSponsorComponents;

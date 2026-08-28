import React from "react";
import Babolat from "../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png";
import melisport from "../../assets/images/logo/melisport_one.png";
import allOnDeck from "../../assets/images/logo/all-on-deck.png";
import padelX from "../../assets/images/logo/padelX-logo.png";

const items = [
  {
    id: 1,
    logo: Babolat,
  },
  {
    id: 2,
    logo: melisport,
  },
  {
    id: 3,
    logo: padelX,
  },
  {
    id: 4,
    logo: allOnDeck,
  },
];

const BrandsSponsorComponents = () => (
  <section className="py-12 b">
    <div className="max-w-7xl mx-auto px-6 text-center overflow-hidden whitespace-nowrap py-1.5 text-white text-xs font-semibold tracking-wide">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Our Partners
      </h2>

      <div className="overflow-hidden bg-gray-200 rounded-lg whitespace-nowrap py-1.5 text-white text-xs font-semibold tracking-wide">
        <div className="grid grid-cols-4 gap-20 animate-[marquee_40s_linear_infinite] py-10">
          {/* Sponsor 1 */}
          {items.map((item) => (
            <div className="flex  px-10 justify-center items-center">
              <img
                src={item.logo}
                alt="Babolat"
                className="h-28 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
        {/* Add more sponsors here if needed */}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(100vw)}100%{transform:translateX(-100%)}}`}</style>
    </div>
  </section>
);

export default BrandsSponsorComponents;

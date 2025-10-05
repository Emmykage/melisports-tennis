import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const ShoesCatalogue = ({ shoe }) => (
  <div className="flex flex-col md:flex-row gap-6 bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
    {/* Shoe Image */}
    <div className="w-full md:w-1/2">
      <img
        src={shoe.image}
        alt={shoe.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Shoe Details */}
    <div className="flex-1 flex flex-col justify-between p-6 text-white">
      <div>
        {/* Name & Description */}
        <h2 className="text-3xl font-semibold mb-3">{shoe.name}</h2>
        <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
          Description
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5">
          {shoe.description}
        </p>

        {/* Technical Characteristics */}
        <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
          Technical Characteristics
        </h3>
        <ul className="divide-y divide-gray-700 mt-2">
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">Fit:</span>
            <span className="font-medium text-orange-400">
              {shoe.technical_characteristics.fit}
            </span>
          </li>
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">Drop:</span>
            <span className="font-medium text-orange-400">
              {shoe.technical_characteristics.Drop}
            </span>
          </li>
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">Surface Type:</span>
            <span className="font-medium text-orange-400">
              {shoe.technical_characteristics.surface_type}
            </span>
          </li>
        </ul>
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-6 flex justify-end">
        <a
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all text-sm font-medium"
          aria-label="Chat on WhatsApp"
          target="_blank"
          href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${shoe.name}`}
          rel="noreferrer"
        >
          <img alt="WhatsApp" src={whatsapp} className="w-5 h-5" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>

);

export default ShoesCatalogue;

import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const Accessories = ({ accessory }) => (
  <div className="flex flex-col md:flex-row gap-6 bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
    {/* Product Image */}
    <div className="w-full md:w-1/2">
      <img
        src={accessory.image}
        alt={accessory.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Product Details */}
    <div className="flex-1 flex flex-col justify-between p-6 text-white">
      <div>
        {/* Title & Description */}
        <h2 className="text-3xl font-semibold mb-3">{accessory.name}</h2>
        <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
          Description
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5">
          {accessory.description}
        </p>

        {/* Technical Characteristics */}
        <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
          Technical Characteristics
        </h3>
        <ul className="divide-y divide-gray-700 mt-2">
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">String Type:</span>
            <span className="font-medium">
              {accessory.technical_characteristics.string_type}
            </span>
          </li>
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">Length:</span>
            <span className="font-medium">
              {accessory.technical_characteristics.length}
            </span>
          </li>
          <li className="py-2 flex justify-between text-sm">
            <span className="text-gray-400">Sport:</span>
            <span className="font-medium">
              {accessory.technical_characteristics.sport}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>

);

export default Accessories;

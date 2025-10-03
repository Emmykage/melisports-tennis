import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const BagsCatalogue = ({ bag }) => (
<div className="flex flex-col lg:flex-row gap-6 bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg">
  {/* Image Section */}
  <div className="flex-shrink-0 lg:w-1/2">
    <img
      src={bag.image}
      alt={bag.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content Section */}
  <div className="flex-1 relative p-6">
    {/* Title & Description */}
    <h2 className="text-2xl font-semibold tracking-wide">{bag.name}</h2>
    <h3 className="mt-3 text-indigo-300 font-medium">Description</h3>
    <p className="mt-1 text-sm leading-relaxed opacity-90">{bag.description}</p>

    {/* Technical Characteristics */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-indigo-400">
        Technical Characteristics
      </h3>
      <ul className="divide-y divide-gray-700 mt-3">
        <li className="flex justify-between py-2 text-sm">
          <span>Racquet Capacity</span>
          <span>{bag.technical_characteristics.racquet_capacity}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Capacity</span>
          <span>{bag.technical_characteristics.capacity}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Dimension</span>
          <span>{bag.technical_characteristics.dimension}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Number of Handles</span>
          <span>{bag.technical_characteristics.number_of_handles}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Number of Compartments</span>
          <span>{bag.technical_characteristics.number_of_compartments}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Number of Straps</span>
          <span>{bag.technical_characteristics.number_of_straps}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Composition</span>
          <span>{bag.technical_characteristics.composition}</span>
        </li>
      </ul>
    </div>

    {/* Action Section */}
    <div className="flex justify-between items-center mt-6">
      <span /> {/* Placeholder if you want future buttons */}
      <a
        className="block hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${bag.name}%20bag`}
      >
        <img
          alt="Chat on WhatsApp"
          src={whatsapp}
          className="w-10 h-10"
        />
      </a>
    </div>
  </div>
</div>

);

export default BagsCatalogue;

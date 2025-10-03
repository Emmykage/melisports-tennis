import React, { useState } from 'react';
import whatsap from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const Rackets = ({ racquet }) => {
  const {
    image, name, description, technical_characteristics,
  } = racquet;
  const [toggle, setToggle] = useState('none');

  return (
<div className="flex flex-col lg:flex-row gap-6 bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg">
  {/* Image Section */}
  <div className="flex-shrink-0 lg:w-1/2">
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Details Section */}
  <div className="flex-1 relative p-6">
    {/* Header */}
    <div className="mb-4">
      <h2 className="text-2xl font-bold tracking-wide">{name}</h2>
      <h3 className="text-indigo-300 mt-2 font-medium">Description</h3>
      <p className="text-sm leading-relaxed opacity-90">{description}</p>
    </div>

    {/* Technical Specs */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-indigo-400">Technical Characteristics</h3>
      <ul className="divide-y divide-gray-700 mt-3">
        <li className="flex justify-between py-2 text-sm">
          <span>Head Size</span>
          <span>{technical_characteristics.head_size}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Weight (unstrung)</span>
          <span>{racquet.technical_characteristics.weight}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Swing Weight</span>
          <span>{racquet.technical_characteristics.swing_weight}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Stiffness (RA)</span>
          <span>{racquet.technical_characteristics.stiffness}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Composition</span>
          <span>{racquet.technical_characteristics.composition}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Tension Recommended</span>
          <span>{racquet.technical_characteristics.tension || "N/A"}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Length</span>
          <span>{racquet.technical_characteristics.length}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Recommended String</span>
          <span>{racquet.technical_characteristics.recommended_string}</span>
        </li>
        <li className="flex justify-between py-2 text-sm">
          <span>Recommended Grip</span>
          <span>{racquet.technical_characteristics.recommended_grip}</span>
        </li>
      </ul>
    </div>

    {/* Overlay Table */}
    {toggle === "show" && (
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col p-6 z-20">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600 text-indigo-300">
              <th className="py-2">Racquet</th>
              <th>Head Size</th>
              <th>Weight</th>
              <th>Tension</th>
              <th>Swing Weight</th>
              <th>Length</th>
              <th>Stiffness</th>
            </tr>
          </thead>
          <tbody>
            {racquet.variations.map((variation, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-2">{variation.racquet}</td>
                <td>{variation.head_size || "N/A"}</td>
                <td>{variation.weight || "N/A"}</td>
                <td>{variation.tension || "N/A"}</td>
                <td>{variation.swing_weight || "N/A"}</td>
                <td>{variation.length || "N/A"}</td>
                <td>{variation.stiffness || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setToggle("none")}
          className="mt-6 px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
        >
          Close
        </button>
      </div>
    )}

    {/* Actions */}
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => setToggle("show")}
        className="px-4 py-2 border border-indigo-400 text-indigo-400 rounded hover:bg-indigo-400 hover:text-white transition"
      >
        View Series
      </button>
      <a
        className="block"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${racquet.name}%20racquet`}
      >
        <img src={whatsap} alt="Chat on WhatsApp" className="w-10 h-10" />
      </a>
    </div>
  </div>
</div>

  );
};

export default Rackets;

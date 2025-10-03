import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const Apparels = ({ apparel }) => (
<div className="flex flex-col md:flex-row gap-6 bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
  {/* Product Image */}
  <div className="w-full md:w-1/2">
    <img
      src={apparel.image}
      alt={apparel.name}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Product Details */}
  <div className="flex-1 flex flex-col justify-between p-6 text-white">
    <div>
      {/* Title & Description */}
      <h2 className="text-3xl font-semibold mb-3">{apparel.name}</h2>
      <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
        Description
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-5">
        {apparel.description}
      </p>

      {/* Technical Characteristics */}
      <h3 className="text-theme-light font-medium uppercase text-sm tracking-wide">
        Technical Characteristics
      </h3>
      <ul className="divide-y divide-gray-700 mt-2">
        <li className="py-2 flex justify-between text-sm">
          <span className="text-gray-400">Content:</span>
          <span className="font-medium">{apparel.content}</span>
        </li>
        <li className="py-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Colors:</span>
            <div className="flex gap-2">
              {apparel.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-800 rounded-md text-xs font-medium"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        </li>
      </ul>
    </div>

    {/* WhatsApp CTA */}
    <div className="flex justify-end mt-6">
      <a
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        aria-label="Chat on WhatsApp"
        target="_blank"
        href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${apparel.name}%20racquet`}
        rel="noreferrer"
      >
        <img src={whatsapp} alt="WhatsApp" className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  </div>
</div>

);

export default Apparels;

import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const BagsCatalogue = ({ bag }) => (
  <div className="flex flex-between seperator service-table ">
    <div className=" p-img">
      <img src={bag.image} alt="" className="w-full h-full" />

    </div>
    <div className="flex-2 bg- relative overflow-hidden pb-4">
      <div className="px-2 block">
        <div>

          <h2 className="line-space px-1 spantara font-normal">{bag.name}</h2>
          <h2 className="color-white font-light description">DESCRIPTION:</h2>
          <p className="px-1 text-sm text-white">{bag.description}</p>
          <div className="p-top-05">
            <h2 className="color-white font-normal technical"> TECHNICAL CHARACTERISTICS </h2>
            <ul className="characters-col px-1  gap-1 ">

              <li className=" border-t p-05 m-02 flex-half">
                <div className="flex flex-between">
                    <span className="xter text-sm">Racket Capacity:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.racquet_capacity}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Capacity:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.capacity}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Dimension:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.racquet_capacity}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Number of Handles:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.number_of_handles}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Number of Compartments:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.number_of_compartments}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Number of Straps:</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.number_of_straps}</span>
                  </div>
              </li>
              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Composition</span>
                    <span className="xter-info text-sm">{bag.technical_characteristics.composition}</span>
                  </div>
              </li>

            </ul>

          </div>
          <hr />

        </div>

      </div>
      <div className="flex row px-2 justify-between items-center">
        <span />
        <div className="whatsapp">
          <a className="block" aria-label="Chat on WhatsApp" target="_blank" href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${bag.name}%20racquet`} rel="noreferrer">
            <img alt="Chat on WhatsApp" src={whatsapp} />
          </a>

        </div>

      </div>

    </div>

  </div>
);

export default BagsCatalogue;

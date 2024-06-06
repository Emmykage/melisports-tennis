import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const ShoesCatalogue = ({ shoe }) => (
  <div className="flex flex-between seperator service-table ">
    <div className=" p-img">
      <img src={shoe.image} alt="" className="w-full h-full" />

    </div>
    <div className="flex-2 bg- relative overflow-hidden pb-4">
      <div className="sm px-2 block">
        <div>

          <h2 className="line-space px-1 spantara font-normal">{shoe.name}</h2>
          <h2 className="color-white font-light description">DESCRIPTION:</h2>
          <p className="px-1 text-sm text-white">{shoe.description}</p>
          <div className="pt-5">
            <h2 className="color-white font-normal technical"> TECHNICAL CHARACTERISTICS </h2>
            <ul className="characters-col px-1  gap-1 ">

              <li className=" border-t p-5 m-5">
                <div className="flex flex-between">
                  <span className="xter text-sm">Fit:</span>
                  <span className="xter-info text-sm text-orange">{shoe.technical_characteristics.fit}</span>
                </div>
              </li>

              <li className=" border-t p-5 m-5">
                <div className="flex flex-between">
                  <span className="xter text-sm">Drop:</span>
                  <span className="xter-info text-sm text-orange">{shoe.technical_characteristics.Drop}</span>
                </div>
              </li>
              <li className=" border-t p-5 m-5">
                <div className="flex flex-between">
                  <span className="xter text-sm ">Surface Type:</span>
                  <span className="xter-info text-sm text-orange">{shoe.technical_characteristics.surface_type}</span>
                </div>
              </li>

            </ul>

          </div>
          <hr />

        </div>

        <div className="flex row px-2 justify-between items-center">
          <span />
          <div className="whatsapp">
            <a className="block" aria-label="Chat on WhatsApp" target="_blank" href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${shoe.name}%20racquet`} rel="noreferrer">
              <img alt="Chat on WhatsApp" src={whatsapp} />
            </a>

          </div>

        </div>

      </div>

    </div>

  </div>
);

export default ShoesCatalogue;

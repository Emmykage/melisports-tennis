import React from 'react';
import whatsapp from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const Accessories = ({ accessory }) => (
  <div className="flex justify-between seperator service-table ">
    <div className=" p-img">
      <img src={accessory.image} alt="" className="w-full h-full" />

    </div>
    <div className="flex-2 bg- relative overflow-hidden pb-0">
      <div className="sm px-2 block">

        <div>

          <h2 className="line-space px-1 spantara font-normal">{accessory.name}</h2>
          <h2 className="text-white font-light description">DESCRIPTION:</h2>
          <p className="px-1 text-sm text-white">{accessory.description}</p>
          <div className="pt-5">
            <h2 className="text-white font-normal technical"> TECHNICAL CHARACTERISTICS </h2>
            <ul className="characters-col px-1  gap-1 ">

              <li className=" border-t p-2 m-2">
                <div className="flex justify-between">
                  <span className="xter text-sm">String Type:</span>
                  <span className="xter-info text-sm">{accessory.technical_characteristics.string_type}</span>
                </div>
              </li>

              <li className=" border-t p-2 m-2 border-gray-900">
                <div className="flex justify-between">
                  <span className="xter text-sm">Length:</span>
                  <span className="xter-info text-sm">{accessory.technical_characteristics.length}</span>
                </div>
              </li>
              <li className=" border-t p-2 m-2 border-gray-900">
                <div className="flex justify-between">
                  <span className="xter text-sm">Sport:</span>
                  <span className="xter-info text-sm">{accessory.technical_characteristics.sport}</span>
                </div>
              </li>

            </ul>

          </div>
          <hr />

        </div>

      </div>

    </div>

  </div>
);

export default Accessories;

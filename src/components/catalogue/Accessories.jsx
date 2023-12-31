import React from 'react';

const Accessories = ({ accessory }) => (
  <div className="flex flex-between seperator service-table ">
    <div className=" p-img">
      <img src={apparel.image} alt="" className="w-full h-full" />

    </div>
    <div className="flex-2 bg- relative overflow-hidden pb-4">
      <div className="sm px-2 block">
        <div>

          <h2 className="line-space px-1 spantara font-normal">{accessory.name}</h2>
          <h2 className="color-white font-light description">DESCRIPTION:</h2>
          <p className="px-1 text-sm text-white">{accessory.description}</p>
          <div className="p-top-05">
            <h2 className="color-white font-normal technical"> TECHNICAL CHARACTERISTICS </h2>
            <ul className="characters-col px-1  gap-1 ">

              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm">Content:</span>
                    <span className="xter-info text-sm">{accessory.content}</span>
                  </div>
              </li>

              <li className=" border-t p-05 m-02">
                <div className="flex flex-between">
                    <span className="xter text-sm flex-1">Colors:</span>
                    <div className="bg- flex-1 flex flex-between gap-1">

                    {accessory.colors.map((color) => (

                      <span className="xter-info text-sm">{color}</span>

                    ))}
                  </div>
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

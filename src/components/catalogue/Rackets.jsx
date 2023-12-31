import React, { useState } from 'react';
import whatsap from '../../assets/images/logo/WhatsAppButtonGreenLarge.png';

const Rackets = ({ racquet }) => {
  const [toggle, setToggle] = useState('none');

  return (
    <div className="flex flex-between seperator service-table ">
      <div className=" p-img">
        <img src={racquet.image} alt="" className="w-full h-full" />

      </div>
      <div className="flex-2 bg- relative overflow-hidden pb-4">
        <div className="sm px-2 block">
          <div>

            <h2 className="line-space px-1 ">{racquet.name}</h2>
            <h2 className="color-white font-light description">DESCRIPTION:</h2>
            <p className="px-1 text-sm text-white">{racquet.description}</p>
            <div className="p-top-05">
              <h2 className="color-white font-normal technical"> TECHNICAL CHARACTERISTICS </h2>
              <ul className="characters px-1  gap-1 ">

                <li className=" border-t p-05 m-02">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Head Size:</span>
                    <span className="xter-info text-sm">{racquet.technical_characteristics.head_size}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Weight (unstrung):</span>
                    <span className="text-sm">{racquet.technical_characteristics.weight}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Swing Weight:</span>
                    <span className="text-sm">{racquet.technical_characteristics.swing_weight}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Stiffness (RA):</span>
                    <span className="text-sm">{racquet.technical_characteristics.stiffness}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Composition:</span>
                    <span className="text-sm">{racquet.technical_characteristics.composition}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Tension Recommended:</span>
                    <span className="text-sm">
                      {' '}
                      {racquet.technical_characteristics.tension}
                    </span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Length:</span>
                    <span className="text-sm">{racquet.technical_characteristics.length}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Recommended String:</span>
                    <span className="text-sm">{racquet.technical_characteristics.recommended_string}</span>
                  </div>
                </li>
                <li className=" border-t m-02 p-05 block">
                  <div className="flex flex-between">
                    <span className="xter text-sm">Recommended Grip:</span>
                    <span className="text-sm">{racquet.technical_characteristics.recommended_grip}</span>
                  </div>
                </li>
              </ul>

            </div>
            <hr />

          </div>
          <div className={`product-overlay ${toggle}`}>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Head Size</th>
                  <th>Weight</th>
                  <th>Tension</th>
                  <th>Swing weight</th>
                  <th>Length</th>
                  <th>Stiffness</th>
                </tr>
              </thead>
              <tbody>
                {racquet.variations.map((variation) => (
                  <tr>
                    <td>{variation.racquet}</td>
                    <td>{variation.head_size ? variation.head_size : 'N/A'}</td>
                    <td>{variation.weight ? variation.weight : 'N/A'}</td>
                    <td>{variation.tension ? variation.tension : 'N/A'}</td>
                    <td>{variation.swing_weight ? variation.swing_weight : 'N/A'}</td>
                    <td>{variation.length ? variation.length : 'N/A'}</td>
                    <td>{variation.stiffness ? variation.stiffness : 'N/A'}</td>
                  </tr>
                ))}

              </tbody>
            </table>
            <div className="close-btn"><a className="border-white close btn px-4 py-1 block m-auto text-white" onClick={() => setToggle('none')}>close</a></div>
          </div>
        </div>
        <div className="flex row px-2 justify-between items-center">
          <span className="series-btn border" onClick={() => setToggle('show')}>View Series</span>
          <div className="whatsapp">
            <a className="block" aria-label="Chat on WhatsApp" target="_blank" href={`https://wa.me/+2347038723093?text=I'm%20interested%20in%20the%20${racquet.name}%20racquet`} rel="noreferrer">
              <img alt="Chat on WhatsApp" src={whatsap} />
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Rackets;

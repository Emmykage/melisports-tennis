import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogAccessories, getCatalogRaquets } from '../redux/catalog/catalog';
import Hero from '../components/banner/Hero';
import Rackets from '../components/catalogue/Rackets';
import Apparels from '../components/catalogue/Apparels';
import BagsCatalogue from '../components/catalogue/Bags';
import ShoesCatalogue from '../components/catalogue/Shoes';
import Accessories from '../components/catalogue/Accessories';
import bannerImage from '../assets/images/banner/Banner_racquets.webp';
import NavInfo from '../components/nav/NavInfo';

const Services = () => {
  const dispatch = useDispatch();
  const {
    racquets, accessories, apparels, bags, shoes,
  } = useSelector((state) => state.catalog);
  useEffect(() => {
    dispatch(getCatalogRaquets());
  }, []);

  return (
    <>
      <NavInfo />

      <Hero image={bannerImage} title="Catalogue" />

      <div className="catalog bg-theme">

        <div className="products-container text-white ">
          <div className="racquets">
            <h2 className="headers">Racquets</h2>

            {racquets.map((racquet) => (
              <Rackets racquet={racquet} key={racquet.name} />))}

          </div>
          <div className="apparel">
            <h2 className="headers">Apparels</h2>
            {apparels.map((apparel) => (
              <Apparels apparel={apparel} key={apparel.name} />
            ))}

          </div>

          <div className="bags">
            <h2 className="headers">Bags</h2>
            {bags.map((bag) => (
              <BagsCatalogue bag={bag} key={bag.name} />
            ))}

          </div>

          <div className="bags">
            <h2 className="headers">Shoes</h2>
            {shoes.map((shoe) => (
              <ShoesCatalogue shoe={shoe} key={shoe.name} />
            ))}

          </div>
          <div className="Accessories">
            <h2 className="headers">Accessories</h2>
            {accessories.map((accessory) => (
              <Accessories accessory={accessory} key={accessory.name} />
            ))}

          </div>
        </div>

      </div>
    </>
  );
};

export default Services;

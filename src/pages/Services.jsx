import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogAccessories, getCatalogRaquets } from '../redux/catalog/catalog';
import Hero from '../components/banner/Hero';
import Rackets from '../components/catalogue/Rackets';
import Apparels from '../components/catalogue/Apparels';
import BagsCatalogue from '../components/catalogue/Bags';
import ShoesCatalogue from '../components/catalogue/Shoes';
import Accessories from '../components/catalogue/Accessories';
import bannerImage from '../assets/images/banner/racquet-banner.jpg';
import Nav from '../components/nav/Nav';
import Container from '../components/container';

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
      <Nav store={false} />
      <Container>

        <Hero image={bannerImage} title="Catalogue" />

        <div className="catalog bg-gradient-to-b from-theme-dark to-theme-darker py-12 px-6">
          <div className="products-container max-w-7xl mx-auto text-white space-y-12">
            {/* Racquets */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-theme-light pb-2">
                Racquets
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {racquets.map((racquet) => (
                  <Rackets racquet={racquet} key={racquet.name} />
                ))}
              </div>
            </section>

            {/* Apparel */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-theme-light pb-2">
                Apparels
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {apparels.map((apparel) => (
                  <Apparels apparel={apparel} key={apparel.name} />
                ))}
              </div>
            </section>

            {/* Bags */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-theme-light pb-2">
                Bags
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {bags.map((bag) => (
                  <BagsCatalogue bag={bag} key={bag.name} />
                ))}
              </div>
            </section>

            {/* Shoes */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-theme-light pb-2">
                Shoes
              </h2>
              <div className="grid grid-cols-1  gap-6">
                {shoes.map((shoe) => (
                  <ShoesCatalogue shoe={shoe} key={shoe.name} />
                ))}
              </div>
            </section>

            {/* Accessories */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-theme-light pb-2">
                Accessories
              </h2>
              <div className="grid grid-cols-1  gap-6">
                {accessories.map((accessory) => (
                  <Accessories accessory={accessory} key={accessory.name} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>

    </>
  );
};

export default Services;

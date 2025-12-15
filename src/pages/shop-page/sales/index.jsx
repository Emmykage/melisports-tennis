import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../../components/banner/Hero';
import { getProducts } from '../../../redux/actions/product'; import bannerImage from '../../../assets/images/banner/babolat-wimby-desktop-banner1.jpg';
import Loader from '../../Loader';
import Products from '../../../components/products/ProductsGridDisplay';
import Nav from '../../../components/nav/Nav';
import { featureItems } from '../../../constants/properties';
import useFilter from '../../../hooks/useFilter';
import { collections, playType } from '../../../constants/variance';
import SideNav from '../../../components/sideNav/SideNav';
import ProductsPageContainer from '../../../components/productItems/ProductItems';
import ProductsGrid from '../../../components/products/ProductsGridDisplay';

const SalesPage = () => {
  const dispatch = useDispatch();

  const [collection, setCollections] = useState([]);
  const [discount, setDiscount] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    products, error, loading, product_categories,
  } = useFilter({
    productDiscount: false,

  });

  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredCollections = (e) => {
    const { value, checked } = e.target;

    setCollections((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)));
  };

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedFeatures((prev) => [...prev, value]) : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };
  console.log(products);

  return (
    <div className="product-container">
      <Nav />
      <Hero image={bannerImage} title="Discounted Sales" />

      <ProductsPageContainer>
        <h2 className="text-2xl font-normal text-gray-900 mb-4">Discounted Sales</h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of discounted sales available for a limited time.
        </p>

        <div className="flex md:gap-10">

          <SideNav>
            <div>
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Racket Type</h6>

              <div className="space-y-2">

                {featureItems.map((item) => (
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={item.value}
                      value={item.value}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredCollections}
                    />

                    <label htmlFor={item.value} style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>
            </div>
            <div className="space-y-2 mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Skill level</h6>
              {collections.map((level) => (
                <span className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={collection.includes(level.value)}
                    id={level.value}
                    value={level.value}
                    onChange={handleFilteredFeatures}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
                  />

                  <label htmlFor={level.value} style={{ fontSize: '1rem' }}>
                    {level.label}
                  </label>
                </span>
              ))}

            </div>
            <div className="space-y-2 mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide"> Brand</h6>

              <div />

              <label className="flex items-center" htmlFor="babolat" style={{ fontSize: '1rem' }}>

                <input onChange={() => {}} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                babolat
              </label>
            </div>
          </SideNav>
          {loading ? <Loader />
            : (
              <div className="product-align w-full">
                <ProductsGrid products={products} error={error} filter="racquet" />

                <div className="product-details color-grey">
                  <h3> BABOLAT TENNIS RACKET BRANDS</h3>
                  <p>
                    { category?.description}

                  </p>
                  {/* <p className="font-semibold text-gray">
                    From your first steps on the court to the pro circuit, Babolat has the racquet for you. Our tennis racquets are designed to let you have fun and play your best tennis game. Join the millions of players around the world who have discovered Babolat's most popular racquets, depending on what you're looking for: the Boost range if you're just starting out, the Evo range for regular play at an intermediate level, and finally, the Pure range for advanced players. Last but not least, the BallFighter range has been specially designed for young boys and the B Fly range for girls. Follow the best players on the threshold of their careers, such as Rafael Nadal, Carlos Alcaraz, Holger Rune, Félix Auger-Aliassime, Dominic Thiem, Leylah Fernandez and many others, by choosing a Babolat tennis racquet.
                  </p> */}

                </div>
              </div>
            ) }
          <div />

        </div>
      </ProductsPageContainer>

    </div>
  );
};

export default SalesPage;

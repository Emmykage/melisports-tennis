import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Hero from '../../../components/banner/Hero';
import bannerImage from '../../../assets/images/banner/babolat-wimby-desktop-banner1.jpg';
import Loader from '../../Loader';
import Nav from '../../../components/nav/Nav';

import { collections } from '../../../constants/variance';
import SideNav from '../../../components/sideNav/SideNav';
import ProductsPageContainer from '../../../components/productItems/ProductItems';
import ProductsGrid from '../../../components/products/ProductsGridDisplay';
import useProducts from '../../../hooks/useProducts';

const SalesPage = () => {
  const dispatch = useDispatch();

  const [collection, setCollections] = useState([]);
  const [discount, setDiscount] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data: products, error, isLoading: loading, product_categories,
  } = useProducts({
    discount: true,
    category: 'racquet',
    sport: 'Tennis',
    levels: selectedLevels,
    features: selectedFeatures,

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

  return (
    <div className="product-container relative">
      <Nav />
      <Hero image={bannerImage} title="Discounted Sales" />

      <ProductsPageContainer>
        <h2 className="text-2xl font-normal text-gray-900 mb-4">Discounted Sales</h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of discounted sales available for a limited time.
        </p>

        <div className="flex md:gap-10">

          <SideNav>

            <div className="space-y-2 mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Collection</h6>
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

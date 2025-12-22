import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Hero from '../../components/banner/Hero';
import bannerImage from '../../assets/images/banner/racquet-banner.jpg';
import { getProducts } from '../../redux/actions/product';

import Loader from '../Loader';

import Nav from '../../components/nav/Nav';
import { classLevels, classSports } from '../../constants/categories';
import useFilter from '../../hooks/useFilter';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import useProducts from '../../hooks/useProducts';
import { featureItems } from '../../constants/variance';
import { useCategoryName } from '../../hooks/fetchHooks/useCategories';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const q = useProducts({
    productCategory: 'racquet',
    // selectedSports: 'Tennis',
    selectedLevels,
    selectedFeatures,
  });
  console.log(q, '[Products Query]');

  const {
    data: products,
    error,
    isLoading: loading,
    isFetching,
    isError,
    refetch,
    status,
  } = q;

  const { data: category } = useCategoryName({
    name: 'racquet',
  });

  const handleFilteredProducts = (seive) => {
    console.log('[Initiate filter]: Filter initatiang with seive:', seive);
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts({
      name: lowerCaseSieve,
    }));
  };

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedFeatures((prev) => [...prev, value]) : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <>
      <Nav />
      <Hero image={bannerImage} title="Racquet" />
      <ProductsPageContainer>

        <div className="flex flex-wrap gap-3 md:gap-6 max-w-lg my-6">
          <button
            onClick={() => dispatch(getProducts({ category: 'racquet' }))}
            className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            All Rackets
          </button>

          <button
            onClick={() => handleFilteredProducts('pure aero')}
            className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Pure Aero
          </button>

          <button
            onClick={() => handleFilteredProducts('pure strike')}
            className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Pure Strike
          </button>

          <button
            onClick={() => handleFilteredProducts('pure drive')}
            className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Pure Drive
          </button>
        </div>

        <div className="flex md:gap-10">

          <SideNav>

            <div>
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Racket Type
              </h6>
              <div className="space-y-2">
                {featureItems.map((item) => (
                  <label
                    key={item.type}
                    htmlFor={item.type}
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={item.type}
                      value={item.type}
                      onChange={handleFilteredFeatures}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-base">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section: Skill Level */}
            <div className="mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Skill Level
              </h6>
              <div className="space-y-2">
                {classLevels.map((level) => (
                  <label
                    key={level.level}
                    htmlFor={level.level}
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={level.level}
                      value={level.level}
                      checked={selectedLevels.includes(level.level)}
                      onChange={handleFilteredLevels}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-base">{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section: Brand */}
            <div>
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Brand
              </h6>
              <div className="space-y-2">
                <label
                  htmlFor="babolat"
                  className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <input
                    type="checkbox"
                    id="babolat"
                    value="babolat"
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-base">Babolat</span>
                </label>
              </div>
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
    </>
  );
};

export default ProductsPage;

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/banner/Hero';
import { getProducts } from '../../redux/actions/product';
import bannerImage from '../../assets/images/banner/2021-Category-Banner-Tennis-Bags.jpg';
import Loader from '../Loader';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';
import { classSports } from '../../constants/categories';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';
import useProducts from '../../hooks/useProducts';

const BagsPage = () => {
  const dispatch = useDispatch();

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { data: products, error, isLoading: loading } = useProducts({
    category: 'bag',
    sport: selectedSports,
    levels: selectedLevels,
    features: selectedFeatures,

  });

  const { product_categories } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'bag');

  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(getProducts({ name: lowerCaseSieve }));
  };

  const handleFilteredActivities = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFeatures((prev) => [...prev, value]);
    } else {
      setSelectedFeatures((prev) => prev.filter((item) => item !== value));
    }
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
      <Hero image={bannerImage} title="Bags & Backpacks" />

      <ProductsPageContainer>

        <div className="prod-page prod-page py-10 px-4 md:px-10  max-w-[1600px] m-auto">
          <div className="cat-group justify-between max-w-md my-6">
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => dispatch(getProducts())}
            >
              All bags
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('backpack')}
            >
              {' '}
              Backpack
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('duffle')}
            >
              {' '}
              Duffle
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('racket holder')}
            >
              {' '}
              Racket holder
            </button>

          </div>

          <div className="flex md:gap-10">
            <SideNav>

              <div className="">
                <h6>Activities</h6>

              </div>
              <div />
              <div className="">

                {classSports.map((item) => (
                  <div className="flex items-center mb-2">
                    <label htmlFor={item.type} style={{ fontSize: '1rem' }} className="flex items-center">

                      <input
                        type="checkbox"
                        id={item.type}
                        value={item.type}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSportFilter}
                      />
                      <span>
                        {item.label}
                      </span>
                    </label>
                  </div>
                ))}

              </div>
              <div className="mt-4">
                <h6>Capacity</h6>

                {[{
                  value: 'RH_X12',
                  label: 'RH X12',
                }, {
                  value: 'RH_X9',
                  label: 'RH X9',
                }, {
                  value: 'RH_X6',
                  label: 'RH X6',
                }, {
                  value: 'RH_X6',
                  label: 'RH X6',
                }, {
                  value: 'RH X3',
                  label: 'RH X3',
                }, {
                  value: 'Duffle',
                  label: 'Duffle',
                }, {
                  value: 'Backpack',
                  label: 'Backpack',
                }].map((item) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.value}
                      value={item.value}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredActivities}
                    />

                    <label htmlFor={item.value} style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>
              <div className="mt-4">
                <h6>Series</h6>

                {[{
                  value: 'Pure Drive',
                  label: 'pure drive',
                }, {
                  value: 'Pure aero',
                  label: 'pure aero',
                }, {
                  value: 'Pure Strike',
                  label: 'pure Strike',
                }].map((item) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.value}
                      value={item.value}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredActivities}
                    />

                    <label htmlFor={item.value} style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>
              <div className="mt-4">
                <h6>Brand</h6>

                <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                  <input onChange={() => {}} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  babolat
                </label>
              </div>
            </SideNav>
            {loading ? <Loader />
              : (
                <div className="product-align w-full">
                  <ProductsGrid products={products} error={error} filter="bag" />

                  <div className="product-details">
                    <h3> BABOLAT TENNIS BAGS BRANDS</h3>
                    <p>
                      {category?.description}
                    </p>

                  </div>
                </div>
              )}

            <div />

          </div>
        </div>
      </ProductsPageContainer>
    </>

  );
};

export default BagsPage;

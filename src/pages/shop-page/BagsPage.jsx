import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import Banner from '../components/banner/Banner';
import Hero from '../../components/banner/Hero';
import { getProducts } from '../../redux/actions/product';
import bannerImage from '../../assets/images/banner/2021-Category-Banner-Tennis-Bags.jpg';
import { closeList } from '../../redux/products/searched';
import Loader from '../Loader';
import { getProductCategories } from '../../redux/actions/product_category';
import { filterGender, filterProducts } from '../../redux/products/product';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';

const levels = [{
  label: 'Beginner',
  level: 'beginner',
},
{
  label: 'Professional',

  level: 'professional',
},
{
  label: 'Intermediate',

  level: 'intermediate',
},
{
  label: 'Junior',

  level: 'junior',
}];

const featureItems = [
  { type: 'control', label: 'Control' },
  { type: 'power', label: 'Power' },
  { type: 'spin', label: 'Spin' },
];

const sportTypes = [
  { type: 'tennis', label: 'Tennis' },
  { type: 'badminton', label: 'Badminton' },
];

const BagsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeature, setSelectedFeatures] = useState([]);

  const category = product_categories?.find((cat) => cat.name === 'bag');

  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(getProducts()).then(() => {
      dispatch(filterProducts(lowerCaseSieve));
    });
  };

  const handleFilteredActivities = (e) => {
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

  useEffect(() => {
    if (selectedSports.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterSports(selectedSports));
      });
    }
  }, [selectedSports, dispatch]);
  useEffect(() => {
    if (selectedLevels.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterLevels(selectedLevels));
      });
    }
  }, [selectedLevels, dispatch]);

  useEffect(() => {
    if (selectedFeature.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterFeatures(selectedFeature));
      });
    }
  }, [selectedFeature, dispatch]);

  useEffect(() => {
    dispatch(closeList());
    dispatch(getProducts({ category: 'bag' }));
    dispatch(getProductCategories());
  }, []);

  return (
    <div className="product-container">
      <Nav />

      <Hero image={bannerImage} />

      <div className="prod-page">
        <div className="cat-group justify-between max-w-md my-6">
        <button className="btn" onClick={() => dispatch(getProducts())}>All bags</button>
        <button className="btn" onClick={() => handleFilteredProducts('backpack')}> Backpack</button>
          <button className="btn" onClick={() => handleFilteredProducts('duffle')}> Duffle</button>
          <button className="btn" onClick={() => handleFilteredProducts('racket holder')}> Racket holder</button>

        </div>

        <div className="flex md:gap-10">
          <div className="side-nav">
            <div className="side-row">
              <h6>Activities</h6>

            </div>
            <div />
            <div className="side-row">
              <div className="flex items-center">
                <label htmlFor="tennis" style={{ fontSize: '1rem' }} className="flex items-center">

                  <input type="checkbox" id="tennis" value="tennis" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <span>
                    Tennis
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label htmlFor="badminton" style={{ fontSize: '1rem' }}>
                  <input type="checkbox" id="badminton" value="badminton" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  Badminton
                </label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="padel" value="padel" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="padel" style={{ fontSize: '1rem' }}>
                  Padel
                </label>
              </div>
            </div>
            <div className="side-row">
              <h6>Capacity</h6>

              <div className="flex items-center">
                <input type="checkbox" id="RH_X12" value="RH X12" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredActivities} />

                <label htmlFor="RH_X12" style={{ fontSize: '1rem' }}>
                  RH X12
                </label>

              </div>
              <div className="flex items-center">

                <input onChange={handleFilteredFeatures} value="RH X9" type="checkbox" id="RH_X9" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="RH_X9" style={{ fontSize: '1rem' }}>
                  RH X9
                </label>
              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredActivities} value="RH X6" type="checkbox" id="RH_X6" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="RH_X6" style={{ fontSize: '1rem' }}>
                  RH X6
                </label>

              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredActivities} value="RH X6" type="checkbox" id="RH_X6" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="RH_X6" style={{ fontSize: '1rem' }}>
                  RH X3
                </label>

              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredActivities} value="backpack" type="checkbox" id="backpack" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="backpack" style={{ fontSize: '1rem' }}>
                  Backpack
                </label>

              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredActivities} value="duffle" type="checkbox" id="duffle" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="backpack" style={{ fontSize: '1rem' }}>
                  Duffle
                </label>

              </div>

            </div>
            <div className="side-row">
              <h6>Series</h6>
              <div className="flex items-center">
                <input onChange={handleFilteredProducts} value="pure drive" type="checkbox" id="pure_drive" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="pure_drive" style={{ fontSize: '1rem' }}>
                  Pure Drive
                </label>

              </div>

              <div className="flex items-center">
                <input onChange={handleFilteredProducts} value="pure strike" type="checkbox" id="pure_strike" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="pure_strike" style={{ fontSize: '1rem' }}>
                  Pure Strike
                </label>

              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredProducts} value="pure aero" type="checkbox" id="pure_aero" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="pure_aero" style={{ fontSize: '1rem' }}>
                  Pure Aero
                </label>

              </div>

              <span className="items-center flex">
                <input type="checkbox" id="advanced" value="advanced" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredActivities} />

                <label htmlFor="advanced" style={{ fontSize: '1rem' }}>
                  Advanced
                </label>

              </span>

            </div>
            <div className="side-row">
              <h6>Brand</h6>

              <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                <input onChange={() => {}} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                babolat
              </label>
            </div>

          </div>
          { status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align w-full">
              <div className="product-items">
                <ProductsGrid products={products} status={status} error={error} filter="bag" />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS BAGS BRANDS</h3>
                <p>
                  {category.description}
                </p>

              </div>
            </div>

          ) : (
            <div className="text-center full-length">
              <h2>{error}</h2>
            </div>
          ))}

          <div />

        </div>
      </div>
    </div>
  );
};
// };

export default BagsPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/banner/Hero';
import bannerImage from '../assets/images/banner/Banner_racquets.webp';
import Products from '../components/products/Products';
import SideNav from '../components/sideNav/SideNav';
import { getProductCategories } from '../redux/actions/product_category';
import { getProducts } from '../redux/actions/product';

import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import Loader from './Loader';
import { filterActivities, filterFeatures, filterProducts, searchedPage, searchedProducts } from '../redux/products/product';
import AllProducts from '../components/products/AllProducts';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const { search_product_page, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts()).then(() => {
      dispatch(filterProducts(lowerCaseSieve));
    });
  };

  const handleFilteredActivities = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterActivities(e.target.value));
      });
    } else {
      dispatch(getProducts());
    }
  };

  const handleFilteredFeatures = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterFeatures(e.target.value));
      });
    } else {
      dispatch(getProducts());
    }
  };

  const handleFilterGender = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterGender(e.target.value));
      });
    } else {
      dispatch(getProducts());
    }
  };

  useEffect(() => {
    const query = searchParams.get('query')
    dispatch(searchedPage(query))


    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProductCategories());
  }, [searchParams, dispatch]);

  return (
    <div className="product-container">
      {/* <Hero image={bannerImage} title="Racquet" /> */}

      <div className="prod-page">
        <div className="cat-group justify-between max-w-md my-6">
          <a className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure Strike</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure drive')}> Pure Drive</a>
          <a className="btn" onClick={() => dispatch(getProducts())}>All Rackets</a>

        </div>

        <div className="flex md:gap-10">

          <div className="side-nav bg-white shadow">
            <div className="side-row">
              <h6>Activities</h6>

            </div>
            <div />
            <div className="side-row">
              <div className="flex  items-center mb-2">
                <input type="checkbox" id="tennis" value="tennis" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="tennis" style={{ fontSize: '1rem' }} className="flex items-center">

                  <span>
                    Tennis
                  </span>
                </label>

              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="badminton" value="badminton" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="badminton" style={{ fontSize: '1rem' }}>

                  Badminton
                </label>
              </div>

            </div>
            <div className="side-row">
              <h6>Racket Type</h6>

              <div className="flex items-center mb-2">
                <input type="checkbox" id="control" value="control" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredFeatures} />

                <label htmlFor="control" style={{ fontSize: '1rem' }}>
                  Control
                </label>

              </div>
              <div className="flex items-center mb-2">

                <input onChange={handleFilteredFeatures} value="power" type="checkbox" id="power" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="power" style={{ fontSize: '1rem' }}>
                  Power
                </label>
              </div>
              <div className="flex items-center">
                <input onChange={handleFilteredFeatures} value="spin" type="checkbox" id="spin" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="spin" style={{ fontSize: '1rem' }}>
                  Spin
                </label>

              </div>

            </div>
            <div className="side-row">
              <h6>Skill level</h6>
              <span className="flex items-center mb-2">
                <input type="checkbox" id="beginner" value="beginner" onChange={handleFilteredActivities} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />

                <label htmlFor="beginner" style={{ fontSize: '1rem' }}>
                  Beginner
                </label>
              </span>

              <span className="flex items-center mb-2">
                <input onChange={handleFilteredActivities} value="professional" type="checkbox" name="professional" id="professional" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="professional">
                  Professional
                </label>

              </span>
              <span className="flex items-center mb-2">
                <input onChange={handleFilteredActivities} value="intermediate" type="checkbox" id="intermediate" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="intermediate" style={{ fontSize: '1rem' }}>
                  Intermediate
                </label>

              </span>

              <span className="items-center flex mb-2">
                <input type="checkbox" id="junior" value="junior" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredActivities} />

                <label htmlFor="junior" style={{ fontSize: '1rem' }}>
                  Junior
                </label>

              </span>

            </div>
            <div className="side-row">
              <h6>Brand</h6>

              <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                <input onChange={handleFilteredActivities} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                babolat
              </label>
            </div>

          </div>

          {status == 'waiting' || loading ? <Loader /> : ((status == 'success')
            ? (
              <div className="product-align ">
                <div className="product-items">
                  <AllProducts products={search_product_page} status={status} error={error} />
                </div>

                <div className="product-details color-grey">
                  <h3> BABOLAT TENNIS RACKET BRANDS</h3>
                  <p>
                    { category?.description}

                  </p>
                  <p className="font-semibold text-gray">
                    From your first steps on the court to the pro circuit, Babolat has the racquet for you. Our tennis racquets are designed to let you have fun and play your best tennis game. Join the millions of players around the world who have discovered Babolat's most popular racquets, depending on what you're looking for: the Boost range if you're just starting out, the Evo range for regular play at an intermediate level, and finally, the Pure range for advanced players. Last but not least, the BallFighter range has been specially designed for young boys and the B Fly range for girls. Follow the best players on the threshold of their careers, such as Rafael Nadal, Carlos Alcaraz, Holger Rune, Félix Auger-Aliassime, Dominic Thiem, Leylah Fernandez and many others, by choosing a Babolat tennis racquet.
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

export default SearchPage;

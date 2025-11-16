import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getProductCategories } from '../redux/actions/product_category';
import { getProducts, searchedProducts } from '../redux/actions/product';

import { closeList } from '../redux/products/searched';
import Loader from './Loader';
import {
  searchedPage,
} from '../redux/products/product';
import ProductsGrid from '../components/products/ProductsGridDisplay';
import Nav from '../components/nav/Nav';
import SideNav from '../components/sideNav/SideNav';
import { featureItems } from '../constants/properties';
import { classLevels } from '../constants/categories';

const SearchPage = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    searched_products, products, loading, searchLoading, error, message,
  } = useSelector((state) => state.products);
  const { product_categories } = useSelector((state) => state.product_categories);
  const query = searchParams.get('search');

  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts({ name: lowerCaseSieve }));
  };

  const handleFilteredActivities = (e) => {
    if (e.target.checked) {
      dispatch(getProducts());
    } else {
      dispatch(getProducts());
    }
  };

  const handleFilteredFeatures = (e) => {
    if (e.target.checked) {
      dispatch(getProducts());
    } else {
      dispatch(getProducts());
    }
  };

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
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
    dispatch(searchedProducts({ search: query }));
    dispatch(getProducts());
  }, [searchParams, dispatch]);
  console.log('Loading', query, searchParams, loading, searchLoading);

  return (
    <div className="product-container">
      <Nav />
      <div className="prod-page px-4">
        <div className="cat-group justify-between max-w-md my-6">
          <a className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure Strike</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure drive')}> Pure Drive</a>
          <a className="btn" onClick={() => dispatch(getProducts())}>All Rackets</a>

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
            <div>
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

          {loading || searchLoading ? <Loader />
            : (
              <div className="product-align w-full py-10">
                <ProductsGrid products={searched_products} error={error} />
                <hr className="my-4" />
                {searched_products.length === 0 && <ProductsGrid products={products} error={error} />}

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

      </div>
    </div>
  );
};

export default SearchPage;

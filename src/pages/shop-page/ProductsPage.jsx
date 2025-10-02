import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Hero from '../../components/banner/Hero';
import bannerImage from '../../assets/images/banner/racquet-banner.jpg';
import Products from '../../components/products/ProductsGridDisplay';
import { getProducts } from '../../redux/actions/product';

import Loader from '../Loader';

import Nav from '../../components/nav/Nav';
import { classLevels, classSports } from '../../constants/categories';
import useFilter from '../../hooks/useFilter';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';

const ProductsPage = () => {
  const featureItems = [
    { type: 'control', label: 'Control' },
    { type: 'power', label: 'Power' },
    { type: 'spin', label: 'Spin' },
  ];

  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const category = product_categories?.find((cat) => cat.name === 'racquet');
  useFilter({
    productCategory: 'racquet',
    selectedSports,
    selectedLevels,
    selectedFeatures,
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

        <div className="prod-page prod-page py-10 px-4 md:px-10  max-w-[1600px] m-auto">
          <div className="cat-group gap-2 md:gap-6 max-w-md my-6">
            <a className="btn" onClick={() => dispatch(getProducts({ category: 'racquet' }))}>All Rackets</a>
            <a className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</a>
            <a className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure Strike</a>
            <a className="btn" onClick={() => handleFilteredProducts('pure drive')}> Pure Drive</a>

          </div>

          <div className="flex md:gap-10">

            <SideNav>
              <div className="side-row">
                <h6>Activities</h6>

              </div>
              <div />
              <div className="side-row">
                {classSports.map((item) => (
                  <div className="flex  items-center mb-2">
                    <input type="checkbox" checked={selectedSports.includes(item.type)} id={item.type} onChange={handleSportFilter} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor={item.type} style={{ fontSize: '1rem' }} className="flex items-center">

                      <span>
                        {item.label}
                      </span>
                    </label>

                  </div>
                ))}

              </div>
              <div className="side-row">
                <h6>Racket Type</h6>

                {featureItems.map((item) => (
                  <div className="flex items-center mb-2">
                    <input type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredFeatures} />

                    <label htmlFor="control" style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>
              <div className="side-row">
                <h6>Skill level</h6>
                {classLevels.map((level) => (
                  <span className="flex items-center mb-2">
                    <input type="checkbox" checked={selectedLevels.includes(level.level)} id={level.level} value={level.level} onChange={handleFilteredLevels} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />

                    <label htmlFor={level.level} style={{ fontSize: '1rem' }}>
                      {level.label}
                    </label>
                  </span>
                ))}

              </div>
              <div className="side-row">
                <h6>Brand</h6>

                <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                  <input onChange={() => {}} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  babolat
                </label>
              </div>
            </SideNav>

            {status == 'waiting' || loading ? <Loader /> : ((status == 'success')
              ? (
                <div className="product-align w-full">
                  <div className="grid gap-[2%] gap-y-2 grid-cols-4">
                    <Products products={products} status={status} error={error} filter="racquet" />
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

      </ProductsPageContainer>
    </>
  );
};

export default ProductsPage;

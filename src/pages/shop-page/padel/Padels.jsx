import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../../components/banner/Hero';
import { getProducts } from '../../../redux/actions/product'; import bannerImage from '../../../assets/images/banner/Babolat_padel_rackets_banner_1 (1).jpg';
import Loader from '../../Loader';
import Products from '../../../components/products/ProductsGridDisplay';
import Nav from '../../../components/nav/Nav';
import { featureItems } from '../../../constants/properties';
import useFilter from '../../../hooks/useFilter';
import { playType } from '../../../constants/variance';
import SideNav from '../../../components/sideNav/SideNav';

const sportItems = [
  { type: 'tennis', label: 'Tennis' },
  { type: 'badminton', label: 'Badminton' },
];
const Padels = () => {
  const dispatch = useDispatch();
  const { padelRacquets, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFeature, setSelectedFeatures] = useState([]);

  useFilter({
    selectedFeature,
    selectedSports,
    selectedPlayType: selectedLevels,
  });
  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts({ name: lowerCaseSieve }));
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
    <div className="product-container">
      <Nav />
      <Hero image={bannerImage} title="Padel" />

      <div className="prod-page py-10 px-4 md:px-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Padel Rackets</h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of Babolat Padel Rackets, designed for players of all levels. Whether you're a beginner or a professional, find the perfect racket to enhance your game.
        </p>
        {/* <div className="cat-group justify-between max-w-md my-6">
          <a className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure Strike</a>
          <a className="btn" onClick={() => handleFilteredProducts('pure drive')}> Pure Drive</a>
          <a className="btn" onClick={() => dispatch(getProducts())}>All Rackets</a>

        </div> */}

        <div className="flex md:gap-10">

          <SideNav>
            <div className="side-row">
              <h6>Activities</h6>

            </div>
            <div />

            <div className="side-row">
              <h6>Racket Type</h6>

              {featureItems.map((item) => (
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={item.value}
                    value={item.value}
                    className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleFilteredFeatures}
                  />

                  <label htmlFor={item.value} style={{ fontSize: '1rem' }}>
                    {item.label}
                  </label>

                </div>
              ))}

            </div>
            <div className="side-row">
              <h6>Skill level</h6>
              {playType.map((level) => (
                <span className="flex items-center mb-2">
                  <input type="checkbox" checked={selectedLevels.includes(level.value)} id={level.value} value={level.value} onChange={handleFilteredLevels} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />

                  <label htmlFor={level.value} style={{ fontSize: '1rem' }}>
                    {level.label}
                  </label>
                </span>
              ))}

            </div>
            <div className="side-row">
              <h6>Brand</h6>

              <div />

              <label className="flex items-center" htmlFor="babolat" style={{ fontSize: '1rem' }}>

                <input onChange={() => {}} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                babolat
              </label>
            </div>
          </SideNav>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success')
            ? (
              <div className="product-align w-full">
                <div className="product-items">
                  <Products products={padelRacquets} status={status} error={error} />
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

export default Padels;

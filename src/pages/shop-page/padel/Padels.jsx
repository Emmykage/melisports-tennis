import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../../components/banner/Hero';
import bannerImage from '../../../assets/images/banner/Babolat_padel_rackets_banner_1 (1).jpg';
import Loader from '../../Loader';
import Nav from '../../../components/nav/Nav';
import { headShapes, playType } from '../../../constants/variance';
import SideNav from '../../../components/sideNav/SideNav';
import ProductsPageContainer from '../../../components/productItems/ProductItems';
import useProducts from '../../../hooks/useProducts';
import ProductsGrid from '../../../components/products/ProductsGridDisplay';
import { useCategoryName } from '../../../hooks/fetchHooks/useCategories';

const Padels = () => {
  const dispatch = useDispatch();

  const [selectedHeadShape, setSelectedHeadShape] = useState([]);
  const [selectedPlayType, setSelectedPlayType] = useState([]);

  const { data: products, error, isLoading: loading } = useProducts({
    sport: 'Padel',
    head_shape: selectedHeadShape,
    play_type: selectedPlayType,
  });

  const { data: category } = useCategoryName({
    name: 'racquet',
  });

  const handleFilteredPlayType = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedPlayType((prev) => [...prev, value]);
    } else {
      setSelectedPlayType((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleFilteredHeadshape = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedHeadShape((prev) => [...prev, value]) : setSelectedHeadShape((prev) => prev.filter((item) => item !== value));
  };

  console.log(loading);

  return (
    <div className="product-container">
      <Nav />
      <Hero image={bannerImage} title="Padel" />

      <ProductsPageContainer>
        <h2 className="text-2xl font-normal text-gray-900 mb-4">Padel Rackets</h2>
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
            <div className="mt-4">
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Play Type</h6>
              {playType.map((play) => (
                <span className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedPlayType.includes(play.value)}
                    id={play.value}
                    value={play.value}
                    onChange={handleFilteredPlayType}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
                  />

                  <label htmlFor={play.value} style={{ fontSize: '1rem' }}>
                    {play.label}
                  </label>
                </span>
              ))}

            </div>
            <div>
              <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                Head Shape
              </h6>
              <div className="space-y-2">
                {headShapes.map((item) => (
                  <label
                    key={item.type}
                    htmlFor={item.value}
                    className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={item.value}
                      value={item.value}
                      checked={selectedHeadShape.includes(item.value)}

                      onChange={handleFilteredHeadshape}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-base">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </SideNav>
          {loading ? <Loader />
            : (
              <div className="product-align w-full">
                <ProductsGrid products={products} error={error} />

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
            ) }
          <div />

        </div>
      </ProductsPageContainer>

    </div>
  );
};

export default Padels;

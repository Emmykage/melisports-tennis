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
import useProducts from '../../../hooks/useProducts';
import { classLevels } from '../../../constants/categories';
import ProductsGrid from '../../../components/products/ProductsGridDisplay';
import { useCategoryName } from '../../../hooks/fetchHooks/useCategories';

const TennisPage = () => {
  const dispatch = useDispatch();

  const [collection, setCollections] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    data:
    products, error, isLoading: loading,
  } = useProducts({
    category: 'racquet',
    sport: 'Tennis',
    levels: selectedLevels,
    features: selectedFeatures,
  });

  const { data: category } = useCategoryName({
    name: 'racquet',
  });

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedFeatures((prev) => [...prev, value]) : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  const handleFilteredLevel = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedLevels((prev) => [...prev, value]) : setSelectedLevels((prev) => prev.filter((item) => item !== value));
  };

  console.log(selectedFeatures, products, 'selectedLevels');

  return (
    <div className="">
      <Nav />
      <Container>

        <Hero image={bannerImage} title="Tennis" />

        <ProductsPageContainer>
          <h2 className="text-2xl font-normal text-gray-900 mb-4">Tennis</h2>
          <p className="text-gray-600 mb-6">
            Explore our collection of Babolat Tennis Categories Rackets, find the perfect Tennis gears to enhance your game.
          </p>

          <div className="flex md:gap-10">

            <SideNav>
              <div>
                <div className="space-y-2 my-4">
                  <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Player Type</h6>
                  {classLevels.map((level) => (
                    <span className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedLevels.some((lev) => lev == level.value)}
                        id={level.value}
                        value={level.value}
                        onChange={handleFilteredLevel}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
                      />

                      <label htmlFor={level.value} style={{ fontSize: '1rem' }}>
                        {level.label}
                      </label>
                    </span>
                  ))}

                </div>

                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">Player Type</h6>

                <div className="space-y-2">

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
      </Container>

    </div>
  );
};

export default TennisPage;

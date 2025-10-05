import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../../components/banner/Hero';
import { getProducts } from '../../../redux/actions/product';

import { closeList } from '../../../redux/products/searched';
import { getProductCategories } from '../../../redux/actions/product_category';
import bannerImage from '../../../assets/images/banner/best-badminton-background-gyixxvloqmf5t6of.webp';
import Loader from '../../Loader';
import ProductFilter from '../../../components/products/ProductFilter';
import ProductsGrid from '../../../components/products/ProductsGridDisplay';
import Nav from '../../../components/nav/Nav';
import SideNav from '../../../components/sideNav/SideNav';
import useFilter from '../../../hooks/useFilter';
import ProductsPageContainer from '../../../components/productItems/ProductItems';

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

const BadmintonsPage = () => {
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeature, setSelectedFeatures] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
    }
  };

  useFilter({
    productCategory: 'racquet',
    selectedSports: 'Badminton',
    selectedPlayType: selectedLevels,
  });

  useEffect(() => {
    if (selectedFeature.length > 0) { // Only filter if there's a selection
      dispatch(getProducts());
    }
  }, [selectedFeature, dispatch]);

  useEffect(() => {
    if (selectedLevels.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterLevels(selectedLevels));
      });
    }
  }, [selectedLevels, dispatch]);

  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedFeatures((prev) => [...prev, value]) : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  useEffect(() => {
    dispatch(closeList());
    dispatch(getProductCategories());
  }, []);
  return (
    <div className="product-container">
      <Nav />

      <Hero image={bannerImage} title="Badminton" />

      <ProductsPageContainer>

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
                  <input type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredFeatures} />

                  <label htmlFor="control" style={{ fontSize: '1rem' }}>
                    {item.label}
                  </label>

                </div>
              ))}

            </div>
            <div className="side-row">
              <h6>Skill level</h6>
              {levels.map((level) => (
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

          {loading ? <Loader />
            : (
              <div className="product-align w-full">
                <ProductsGrid products={products} status={status} error={error} />

                <div className="product-details color-grey">
                  <h3> BABOLAT TENNIS RACKET BRANDS</h3>
                  <p>
                    { category?.description}

                  </p>

                </div>
              </div>
            )}
          <div />

        </div>

      </ProductsPageContainer>
    </div>
  );
};

export default BadmintonsPage;

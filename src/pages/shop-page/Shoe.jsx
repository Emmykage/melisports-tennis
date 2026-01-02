import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/banner/Hero';
import { getProducts } from '../../redux/actions/product';
import bannerImage from '../../assets/images/banner/2023-01_BAB_Banner_70_pourcents_Propulse_Fury_1365x510px-2.avif';
import Loader from '../Loader';

import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';

import useFilter from '../../hooks/useFilter';
import { classSports, genderItems, itemsFeatures } from '../../constants/categories';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';
import useProducts from '../../hooks/useProducts';
import Container from '../../components/container';

const ShoesPage = () => {
  const dispatch = useDispatch();

  const [selectedCapacities, setSelectedCapacities] = useState([]);

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const { data: products, error, isLoading: loading } = useProducts({
    productCategory: 'shoe',
    selectedSports,
    selectedLevels,
    selectedFeatures,
    selectedGenders,

  });
  const { product_categories } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'shoe');

  const handleFilteredCapacities = (e) => {
    const { checked, value } = e.target;
    checked
      ? setSelectedCapacities((prev) => [...prev, value]) : setSelectedCapacities((prev) => prev.filter((item) => item !== value));
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleGenderFilter = (e) => {
    const { checked, value } = e.target;
    console.log(value);

    if (checked) {
      setSelectedGenders((prev) => [...prev, value]);
    } else {
      setSelectedGenders((prev) => prev.filter((item) => item !== value));
    }
  };
  const handleSportsFilter = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };
  const handleFilteredFeatures = (e) => {
    const { checked, value } = e.target;
    checked ? setSelectedFeatures((prev) => [...prev, value]) : setSelectedFeatures((prev) => prev.filter((item) => item !== value));
  };

  return (
    <>
      <Nav />
      <Container>

        <Hero image={bannerImage} title="Shoes" />
        <ProductsPageContainer>

          <div className="cat-group gap-6  max-w-md my-6">
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => dispatch(getProducts({ category: 'shoe' }))}
            >
              All shoes
            </button>

            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('men')}
            >
              {' '}
              Men
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('women')}
            >
              {' '}
              Women
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('kids')}
            >
              {' '}
              Kids
            </button>

          </div>
          <div className="flex md:gap-10">
            <SideNav>

              {/* Section: Racket Type */}
              <div>
                <h6 className="text-gray-800 font-semibold mb-3 tracking-wide">
                  Racket Type
                </h6>

                <div className="">

                  {classSports.map((item) => (
                    <div className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleSportsFilter}
                        id={item.type}
                        value={item.type}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />

                      <label htmlFor={item.type} style={{ fontSize: '1rem' }} className="flex items-center">
                        <span>
                          {item.label}
                        </span>
                      </label>

                    </div>
                  ))}

                </div>
              </div>

              <div className="mt-4">
                <h6>Category</h6>

                {genderItems.map((item) => (
                  <div className="flex items-center">
                    <label htmlFor={item.type} style={{ fontSize: '1rem' }}>

                      <input
                        type="checkbox"
                        id={item.type}
                        value={item.type}
                        className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleGenderFilter}
                      />

                      {item.label}
                    </label>

                  </div>
                ))}

              </div>

              <div />

              <div className="mt-4">
                <h6>Court Type</h6>

                {itemsFeatures.map((item) => (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.type}
                      value={item.type}
                      className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleFilteredFeatures}
                    />

                    <label htmlFor={item.type} style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>

              <div className="mt-4">
                <h6>Brand</h6>
                <div className="flex items-center">
                  <input
                //  onChange={handleFilteredActivities}
                    value="babolat"
                    type="checkbox"
                    id="babolat"
                    className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                    babolat
                  </label>

                </div>

              </div>
            </SideNav>
            {loading ? <Loader />
              : (
                <div className="product-align w-full">
                  <ProductsGrid products={products} status={status} error={error} />

                  <div className="product-details">
                    <h3> BABOLAT TENNIS SHOES</h3>
                    <p>

                      { category?.description}
                    </p>

                  </div>
                </div>
              )}

            <div />

          </div>
        </ProductsPageContainer>
      </Container>
    </>
  );
};

export default ShoesPage;

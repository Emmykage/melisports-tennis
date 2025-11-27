import React, { startTransition, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/product';
import imageBanner from '../../assets/images/banner/BABcup_1365x510-Version-1_no_logo.avif';
import { closeList } from '../../redux/products/searched';
import Hero from '../../components/banner/Hero';
import Loader from '../Loader';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import { getProductCategories } from '../../redux/actions/product_category';
import Nav from '../../components/nav/Nav';
import useFilter from '../../hooks/useFilter';
import { classLevels, classSports, genderItems } from '../../constants/categories';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';
import { featureItems } from '../../constants/properties';

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const {
    products, error, loading, product_categories,
  } = useFilter({
    productCategory: 'apparel',
    selectedSports,
    selectedLevels,
    selectedFeatures,
    selectedGenders,

  });
  console.log(products, loading, 'APparels fetched');
  const category = product_categories?.find((cat) => cat.name === 'apparel');
  const handleFilteredProducts = (seive) => {
    console.log(seive);
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts({
      gender: lowerCaseSieve,
    }));
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

  console.log(selectedGenders);

  return (
    <>
      <Nav />

      <Hero image={imageBanner} title="Apparels" />
      <ProductsPageContainer>
        <div className="cat-group gap-2 md:gap-6 max-w-md my-6">
          <button
            className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onClick={() => dispatch(getProducts())}
          >
            All Apparels
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

          {loading ? <Loader />
            : (
              <div className="product-align w-full">
                <ProductsGrid products={products} status={status} error={error} />

                <div className="product-details">
                  <h3> BABOLAT TENNIS APPARELS BRANDS</h3>
                  <p>

                    {category?.description}
                  </p>

                </div>
              </div>
            )}

        </div>

      </ProductsPageContainer>
    </>

  );
};

export default ApparelsPage;

import React, { startTransition, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/product';
import imageBanner from '../../assets/images/banner/BABcup_1365x510-Version-1_no_logo.avif';
import { closeList } from '../../redux/products/searched';
import { filterGenders, filterProducts, filterSports } from '../../redux/products/product';
import Hero from '../../components/banner/Hero';
import Loader from '../Loader';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import { getProductCategories } from '../../redux/actions/product_category';
import Nav from '../../components/nav/Nav';
import { classSports } from './categories';
import useFilter from '../../hooks/useFilter';

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);


  useFilter({
    productCategory: "racquet",
    selectedSports,
    selectedLevels,
    selectedFeatures
  })
  const category = product_categories?.find((cat) => cat.name === 'apparel');
  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.loLowerCase();

    dispatch(getProducts()).then(() => {
      dispatch(filterProducts(lowerCaseSieve));
    });
  };

  const genderItems = [{
    type: 'men',
    label: 'Men',
  },
  {
    type: 'women',
    label: 'Women',
  }];


  const handleGenderFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedGenders((prev) => [...prev, value]);
    } else {
      dispatch(getProducts());
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

  useEffect(() => {
    if (selectedGenders.length > 0) {
      dispatch(getProducts()).then(() => {
        dispatch(filterGender(selectedGenders));
      });
    }
  }, [selectedGenders]);

  useEffect(() => {
    if (selectedSports.length > 0) {
      dispatch(getProducts()).then(() => {
        dispatch(filterSports(selectedSports));
      });
    }
  }, [selectedSports]);

  useEffect(() => {
    dispatch(closeList());
    // products?.length == 0 && dispatch(getProducts());

    startTransition(() => {
      dispatch(getProducts({ category: 'apparel' }));
    });
    dispatch(getProductCategories());
  }, []);

  return (
    <>
      <div className="product-container">
        <Nav />

        <Hero image={imageBanner} title="Apparels" />
        <div className="prod-page">
          <div className="cat-group gap-2 md:gap-6 max-w-md my-6">
          <button className="btn" onClick={() => dispatch(getProducts())}>All Apparels</button>

            <button className="btn" onClick={() => handleFilteredProducts('men')}> Men</button>
            <button className="btn" onClick={() => handleFilteredProducts('women')}> Women</button>
            <button className="btn" onClick={() => handleFilteredProducts('kids')}> Kids</button>

          </div>

          <div className="flex md:gap-10">
            <div className="side-nav bg-white shadow">
              <div className="side-row">
                <h6>Activities</h6>

              </div>
              <div />
              <div className="side-row">

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
              <div className="side-row">
                <h6>Category</h6>

                {genderItems.map((item) => (
                  <div className="flex items-center">
                    <input type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleGenderFilter} />

                    <label htmlFor="men" style={{ fontSize: '1rem' }}>
                      {item.label}
                    </label>

                  </div>
                ))}

              </div>

              {/* <div className="side-row">
              <h6>Skill level</h6>
              <span className="flex items-center">
                <label htmlFor="beginner" style={{ fontSize: '1rem' }}>
                  <input type="checkbox" id="beginner" value="beginner" onChange={handleFilteredActivities} className="w-4 h-4 text-blue-600 bg-gray-500 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                  Beginner
                </label>
              </span>

              <span>
                <label htmlFor="professional">
                  <input onChange={handleFilteredActivities} value="professional" type="checkbox" name="professional" id="professional" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  Professional
                </label>

              </span>
              <span className="flex items-center">
                <input onChange={handleFilteredActivities} value="intermediate" type="checkbox" id="intermediate" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="intermediate" style={{ fontSize: '1rem' }}>
                  Intermediate
                </label>

              </span>

              <span className="items-center flex">
                <input type="checkbox" id="advanced" value="advanced" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredActivities} />

                <label htmlFor="advanced" style={{ fontSize: '1rem' }}>
                  Advanced
                </label>

              </span>

            </div> */}
              <div className="side-row">
                <h6>Brand</h6>
                <div className="flex items-center">
                  <input onChange={() => dispatch(getProducts())} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="activity" style={{ fontSize: '1rem' }}>
                    babolat
                  </label>
                </div>

              </div>

            </div>
            {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
              <div className="product-align w-full">
                <div className="product-items">
                  <ProductsGrid products={products} status={status} error={error} filter="apparel" />

                </div>

                <div className="product-details">
                  <h3> BABOLAT TENNIS APPARELS BRANDS</h3>
                  <p>

                    {category?.description}
                  </p>

                </div>
              </div>
            ) : (
              <div className="text-center full-length">
                <h2>{error}</h2>
              </div>
            )) }

          </div>

        </div>

      </div>
    </>

  );
};

export default ApparelsPage;

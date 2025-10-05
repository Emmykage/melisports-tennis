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
import { classSports, genderItems } from '../../constants/categories';
import SideNav from '../../components/sideNav/SideNav';
import ProductsPageContainer from '../../components/productItems/ProductItems';

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);

  useFilter({
    productCategory: 'apparel',
    selectedSports,
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

            <div className="side-row">
              <h6>Brand</h6>
              <div className="flex items-center">
                <input onChange={() => dispatch(getProducts())} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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

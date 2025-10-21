import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import Banner from '../components/banner/Banner';
import Hero from '../../components/banner/Hero';
import { getProducts } from '../../redux/actions/product';
import { closeList } from '../../redux/products/searched';
import { getProductCategories } from '../../redux/actions/product_category';
import Loader from '../Loader';
import bannerImage from '../../assets/images/banner/2021-Category-Banner-Tennis-Accessories.jpg';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';
import ProductsPageContainer from '../../components/productItems/ProductItems';
import SideNav from '../../components/sideNav/SideNav';

const AccessoriesPage = () => {
  const dispatch = useDispatch();
  const {
    products, status, error, loading,
  } = useSelector((state) => state.products);
  const { product_categories } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'accessory');

  const handleFilteredProducts = (seive) => {
    console.log(seive);
    const lowerCaseSieve = seive.toLowerCase();
    console.log(lowerCaseSieve);

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

  useEffect(() => {
    dispatch(getProducts({ category: 'accessory' }));

    dispatch(closeList());
    dispatch(getProductCategories());
  }, []);

  return (
    <>
      <Nav />

      <Hero image={bannerImage} title="Accessories" />
      <ProductsPageContainer>

        <div className="prod-page">
          <div className="cat-group gap-6 max-w-3xl my-6">
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => dispatch(getProducts())}
            >
              All Accessories
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('racquet')}
            >
              {' '}
              Racket Accessories
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('court')}
            >
              {' '}
              Court Accessories
            </button>
            <button
              className="px-4 py-2 rounded-full bg-theme text-gray-200 text-sm font-medium shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={() => handleFilteredProducts('fan')}
            >
              {' '}
              Fan Accessories
            </button>

          </div>

          <div className="flex md:gap-10">
            <SideNav>
              <div className="side-row">
                <h6>Activities</h6>

              </div>
              <div />
              <div className="side-row">
                <div className="flex items-center">
                  <input type="checkbox" id="tennis" value="tennis" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                  <label htmlFor="tennis" style={{ fontSize: '1rem' }} className="flex items-center">

                    <span>
                      Tennis
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="badminton" value="badminton" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="badminton" style={{ fontSize: '1rem' }}>

                    Badminton
                  </label>
                </div>

              </div>
              <div className="side-row">
                <h6>Category</h6>

                <div className="flex items-center">
                  <input type="checkbox" id="racket" value="racket" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredFeatures} />

                  <label htmlFor="racket" style={{ fontSize: '1rem' }}>
                    Racket
                  </label>

                </div>
                <div className="flex items-center">

                  <input onChange={handleFilteredFeatures} value="power" type="checkbox" id="power-beginner" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                  <label htmlFor="power-beginner" style={{ fontSize: '1rem' }}>
                    Apparels
                  </label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleFilteredFeatures} value="grip" type="checkbox" id="grip" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                  <label htmlFor="grip" style={{ fontSize: '1rem' }}>
                    Grip
                  </label>

                </div>

              </div>

              <div className="side-row">
                <h6>Brand</h6>

                <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                  <input onChange={handleFilteredActivities} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  babolat
                </label>
              </div>

            </SideNav>

            {loading ? <Loader />
              : (
                <div className="product-align w-full">

                  <ProductsGrid filter="accessory" products={products} status={status} error={error} />
                  <div className="product-details ">
                    <h3> BABOLAT TENNIS ACCESSORIES BRANDS</h3>
                    <p>
                      {category?.description}
                    </p>

                  </div>
                </div>
              )}

            <div />

          </div>
        </div>
      </ProductsPageContainer>
    </>

  );
};
export default AccessoriesPage;

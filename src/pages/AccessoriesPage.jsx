import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import Banner from '../components/banner/Banner';
import Hero from '../components/banner/Hero';
import Accessories from '../components/products/Accessories';
import SideNav from '../components/sideNav/SideNav';
import { getProducts } from '../redux/actions/product';
import { closeNav } from '../redux/modal/nav';
import { filterProducts } from '../redux/actions/product';
import { closeList } from '../redux/products/searched';
import { getProductCategories } from '../redux/actions/product_category';
import Loader from './Loader';

const AccessoriesPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const category = product_categories.find((cat) => cat.name === 'accessory');

  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.loLowerCase();
    dispatch(filterProducts(lowerCaseSieve));
  };
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProducts());
    dispatch(getProductCategories());
  }, []);
  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="product-container">
      <Hero />

      <div className="prod-page">
        <div className="cat-group">
          <button className="btn" onClick={() => handleFilteredProducts('racquet')}> Racket Accessories</button>
          <button className="btn" onClick={() => handleFilteredProducts('pure strike')}> Court Accessories</button>
          <button className="btn" onClick={() => handleFilteredProducts('boost')}> Fan Accessories</button>
          <button className="btn" onClick={() => dispatch(getProducts())}>All Accessories</button>

        </div>

        <div className="flex-center level">
          <div className="side-nav">
            <SideNav />
          </div>

          {status == "waiting" || loading ? <Loader/> : ((status == "success") ? (<div className="product-align">
            <div className="product-items">

              <Accessories products={products} status={status} error={error} />
            </div>
            <div className="product-details">
              <h3> BABOLAT TENNIS ACCESSORIES BRANDS</h3>
              <p>
                {category.description}
              </p>

            </div>
          </div>) : ( <div className="text-center full-length">
      <h2>{error}</h2>
    </div>)) }
          
          <div />

        </div>
      </div>
    </div>
  );
};
export default AccessoriesPage;

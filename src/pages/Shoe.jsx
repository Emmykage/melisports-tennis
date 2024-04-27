import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/banner/Hero';
import Shoes from '../components/products/Shoes';
import SideNav from '../components/sideNav/SideNav';
import { getProducts } from '../redux/actions/product';
import { closeNav } from '../redux/modal/nav';

import { closeList } from '../redux/products/searched';
import { getProductCategories } from '../redux/actions/product_category';
import Loader from './Loader';
import { filterProducts } from '../redux/products/product';

const ShoesPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const category = product_categories.find((cat) => cat.name === 'shoe');

  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(filterProducts(lowerCaseSieve));
  };

  useEffect(() => {
    dispatch(closeList());
    dispatch(closeNav());
    dispatch(getProductCategories());
  }, []);

  return (
    <div className="product-container">
      <Hero />

      <div className="prod-page">
        <div className="cat-group">
          <button className="btn" onClick={() => handleFilteredProducts('pure aero')}> Men</button>
          <button className="btn" onClick={() => handleFilteredProducts('pure strike')}> Women</button>
          <button className="btn" onClick={() => handleFilteredProducts('boost')}> Kids</button>
          <button className="btn" onClick={() => dispatch(getProducts())}>All shoes</button>

        </div>
        <div className="flex-center level">
          <div className="side-nav">
            <SideNav />
          </div>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align">
              <div className="product-items">
                <Shoes products={products} status={status} error={error} />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS SHOES</h3>
                <p>

                  { category.description}
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

export default ShoesPage;

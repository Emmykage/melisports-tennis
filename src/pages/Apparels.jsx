import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../components/sideNav/SideNav';
import Hero from '../components/banner/Hero';
import Apparels from '../components/products/Apparels';
import { filterProducts, getProducts } from '../redux/actions/product';

import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import Loader from './Loader';

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const category = product_categories.find((cat) => cat.name === 'apparel');
  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.loLowerCase();
    dispatch(filterProducts(lowerCaseSieve));
  };
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProducts());
  }, []);
  return (
    <div className="product-container">
      <Hero />
      <div className="prod-page">
        <div className="cat-group">
          <button className="btn" onClick={() => handleFilteredProducts('men')}> Men</button>
          <button className="btn" onClick={() => handleFilteredProducts('women')}> Women</button>
          <button className="btn" onClick={() => handleFilteredProducts('kids')}> Kids</button>
          <button className="btn" onClick={() => dispatch(getProducts())}>All Apparels</button>

        </div>

        <div className="flex-center level">
          <div className="side-nav">

            <SideNav />
          </div>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align">
              <div className="product-items">
                <Apparels products={products} status={status} error={error} />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS APPARELS BRANDS</h3>
                <p>

                  {category.description}
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
  );
};

export default ApparelsPage;

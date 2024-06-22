import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/banner/Hero';
import bannerImage from '../assets/images/banner/Banner_racquets.webp';
import Products from '../components/products/Products';
import SideNav from '../components/sideNav/SideNav';
import { getProductCategories } from '../redux/actions/product_category';
import { getProducts } from '../redux/actions/product';

import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import Loader from './Loader';
import { filterProducts } from '../redux/products/product';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'racquet');

  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase();

    dispatch(getProducts()).then(() => {
      dispatch(filterProducts(lowerCaseSieve));
    });
  };

  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProductCategories());
  }, []);

  return (
    <div className="product-container">
      <Hero image={bannerImage} title="Racquet" />

      <div className="prod-page">
        <div className="cat-group">
          <button className="btn" onClick={() => handleFilteredProducts('pure aero')}> Pure Aero</button>
          <button className="btn" onClick={() => handleFilteredProducts('pure strike')}> Pure strike</button>
          <button className="btn" onClick={() => handleFilteredProducts('boost')}> Boost</button>
          <button className="btn" onClick={() => dispatch(getProducts())}>All rackets</button>

        </div>

        <div className="flex md:gap-10">
          <div className="side-nav">
            <SideNav />
          </div>

          {status == 'waiting' || loading ? <Loader /> : ((status == 'success')
            ? (
              <div className="product-align ">
                <div className="product-items flex justify-between sm:p-8 bg-gray-100">
                  <Products products={products} status={status} error={error} />
                </div>

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

export default ProductsPage;

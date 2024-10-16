import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../pages/Loader';
import './products.css';

const AllProducts = ({ products, status, error }) => {
  const NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  const racketProducts = products.filter((item) => item.product_category.name === 'racquet');

  if (status === 'waiting') {
    return (
      <Loader />
    );
  } if (status === 'success') {
    if (products.length < 1) {
      return (
        <div>
          <header>

            <h1 className="font-sans text-center text-3xl font-semibold"> No Item in this Collection</h1>
          </header>
        </div>
      );
    }

    return (

      <>

        {products.map((product) => (
          <div key={product.id} className="products-display sm:min-w-48 w-full ">
            <div className="prod-img">
              <NavLink to={`/productdetails/${product.id}`}>
                <img src={product.photo_urls ? product.photo_urls[0] : product.image} alt={product.name} />
              </NavLink>

            </div>
            <div className="prod-details">
              <h5 className="text-gray-900 block md:hidden">

                {product.name.substring(0, 10)}
                ...
              </h5>

              <h5 className="text-gray-900 hidden md:block">

                {product.name.substring(0, 15)}
                ...
              </h5>
              <p>
                {' '}
                {NGNaira.format(product.price)}
              </p>
              <NavLink className="btn btn-outline" to={`/productdetails/${product.id}`}>
                Buy
              </NavLink>

            </div>
          </div>

        ))}

      </>
    );
  }
  return (
    <div className="text-center">
      <h2>
        {' '}
        {error}
      </h2>
    </div>
  );
};

export default AllProducts;

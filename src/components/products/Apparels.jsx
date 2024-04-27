import React from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../pages/Loader';
import './products.css';

const Apparels = ({ products, status, error }) => {
  const NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  const apparelsProducts = products.filter((item) => item.product_category.name === 'apparel');

  if (apparelsProducts.length < 1) {
    return (
      <div>
        <header>

          <h1 className="warning-center"> No Shoes in collection</h1>
        </header>
      </div>
    );
  }
  return (

    <>

      {apparelsProducts.map((product) => (
        <div key={product.id} className="products-display">
          <div className="prod-img">
            <NavLink to={`/productdetails/${product.id}`}>
            <img src={product.photo_url ? product.photo_url : product.image} alt={product.name} />
            </NavLink>

          </div>
          <div className="prod-details">
            <h5 className="color-black">
              {product.name.substring(0, 15)}
              ...
            </h5>
            <p>{NGNaira.format(product.price)}</p>
            <NavLink className="btn btn-outline" to={`/productdetails/${product.id}`}>
              Buy
            </NavLink>

          </div>
        </div>

      ))}

    </>
  );
};

export default Apparels;

import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../pages/Loader';
import './products.css';
import { naira_format } from '../utils/naira_format';
import ProductCard from '../card/ProductCard';

const ProductFilter = ({ products, status, error }) => {

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
        <ProductCard product={product} />

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

export default ProductFilter;

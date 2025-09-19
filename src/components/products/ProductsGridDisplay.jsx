import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../pages/Loader';
import './products.css';
import ProductCard from '../card/ProductCard';

const ProductsGrid = ({
  products, status, error, filter,
}) => {
  const sortProduct = filter ? products.filter((item) => item.product_category.name === filter) : products;

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

        {sortProduct.map((product) => (
          <ProductCard key={product.id} product={product} />

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

export default ProductsGrid;

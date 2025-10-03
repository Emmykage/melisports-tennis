import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../pages/Loader';
import './products.css';
import ProductCard from '../card/ProductCard';

const ProductsGrid = ({
  products, status, error, filter, loading,
}) => {
  const sortProduct = filter ? products.filter((item) => item.product_category.name === filter) : products;

  if (error) {
    return (
      <div className="text-center">
        <h2>
          {' '}
          {error}
        </h2>
      </div>
    );
  }

  if (products.length < 1) {
    return (
      <div>
        <header>

          <h1 className="font-sans text-center text-3xl font-normal"> No Item in this Collection</h1>
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
};

export default ProductsGrid;

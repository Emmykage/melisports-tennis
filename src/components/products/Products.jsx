import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProducts } from '../../redux/actions/product';
import './products.css';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });
  return (
    <>

      {products.map((product) => (
        <div key={product.id} className="products-display">
          <div className="prod-img">
            <NavLink to={`productdetails/${product.id}`}>
            <img src={product.image} alt="" />
            </NavLink>
            
          </div>
          <div className="prod-details">
            <h5 className="color-black">
              {product.title.substring(0, 15)}
              ...
            </h5>
            <p>{product.price}</p>
            <NavLink className="btn color-grey btn-outline" to={`/productdetails/${product.id}`}>
              Buy
            </NavLink>

          </div>
        </div>

      ))}

    </>
  );
};

export default Products;

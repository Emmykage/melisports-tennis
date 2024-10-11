import React from 'react';
import { NavLink } from 'react-router-dom';
import { naira_format } from '../../utils/naira_format';

const ProductCard = ({ product }) => (
  <div key={product.id} className="relative text-center md:basis-[24%] basis-[48%] border border-theme-dark p-3 mb-6 rounded-xl h-max bg-white overflow-hidden sm:min-w-48 w-full ">
    <div className="m-0">
      <NavLink to={`/productdetails/${product.id}`}>
        <img src={product.photo_urls ? product.photo_urls[0] : product.image} alt={product.name} className="w-full md:h-60 h-52" />
      </NavLink>

    </div>
    {product.new_product
                  && (
                  <div className="absolute top-6 left-0 p-2 bg-red-600/70 rounded">
                    <p className="text-white font-semibold">New</p>

                  </div>
                  )}
    <div className="">
      <h5 className="text-gray-900 block text-base md:hidden">

        {product.name.substring(0, 12)}
        ...
      </h5>

      <h5 className="text-gray-900 hidden md:block text-base my-3">

        {product.name.substring(0, 15)}
        ...
      </h5>
      <p className="text-base my-3">
        {' '}
        {naira_format(product.price)}
      </p>
      <NavLink className="w-full bg-theme-darker text-white block py-2 rounded" to={`/productdetails/${product.id}`}>
        Buy
      </NavLink>

    </div>
  </div>
);

export default ProductCard;

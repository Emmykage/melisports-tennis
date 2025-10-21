import React from 'react';
import { NavLink } from 'react-router-dom';
import { nairaFormat } from '../../utils/nairaFormat';

const ProductCard = ({ product }) => (
  <div
    key={product.id}
    className="relative text-center md:basis-[24%] basis-[48%] border border-gray-200 p-4 mb-6 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
  >
    {/* Product Image */}
    <div className="relative group">
      <NavLink to={`/productdetails/${product.id}`}>
        <img
          src={product.photo_urls ? product.photo_urls[0] : product.image}
          alt={product.name}
          className="w-full md:h-60 h-52 object-contain transform group-hover:scale-105 transition duration-300"
        />
      </NavLink>

      {/* New Badge */}
      {product.new_product && (
      <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        New
      </span>
      )}

      {/* Discount Badge */}
      {product?.discount == 'active_discount' && (
      <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        {product?.discount
          ? `-${product?.discount_percentage}%`
          : 'Discount'}
      </span>
      )}
    </div>

    {/* Product Info */}
    <div className="mt-4">
      <h5 className="text-gray-900 text-base font-medium line-clamp-1 mb-2">
        {product?.name}
      </h5>

      {/* Pricing Section */}
      <div className="mb-4">
        {product.discount === 'active_discount' ? (
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm text-gray-400 line-through">
              {nairaFormat(product.price)}
            </p>
            {/* <p className="text-lg font-semibold text-green-600">
            {nairaFormat(
              product.price -
                (product.price * (product.discount_amount || 0)) / 100
            )}
          </p> */}

            <p className="text-lg font-semibold text-green-600">
              {nairaFormat(
                ((product.discount_amount || 0)),
              )}
            </p>
          </div>
        ) : (
          <p className="text-lg font-semibold text-primary">
            {nairaFormat(product.price)}
          </p>
        )}
      </div>

      {/* CTA */}
      <NavLink
        className="w-full inline-block bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-medium transition-colors duration-200"
        to={`/productdetails/${product.id}`}
      >
        Buy Now
      </NavLink>
    </div>
  </div>

);

export default ProductCard;

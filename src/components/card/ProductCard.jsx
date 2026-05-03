import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { nairaFormat } from '../../utils/nairaFormat';

const ProductCard = ({ product }) => {
  const [newInventory, setNewInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newArray = [];

    product.product_inventories?.forEach((inventory, index) => {
      const exists = newArray.some((n) => n.size == inventory.size);
      console.log(inventory, exists, newArray);
      if (!exists) { newArray.push(inventory); }
    });

    setNewInventory(newArray);
  }, [product]);

  const renderBadge = () => {
    if (newInventory < 1) {
      return (
        <span className="absolute top-4 right-4 bg-theme text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Out of stock
        </span>
      );
    }

    if (product?.discount === 'active_discount') {
      return (
        <span className="absolute top-4 right-4 bg-theme text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {product?.discount_percentage
            ? `-${product.discount_percentage}%`
            : 'Discount'}
        </span>
      );
    }

    return null;
  };

  return (
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
        {renderBadge()}
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h5 className="text-gray-900 capitalize text-base font-medium line-clamp-1 mb-2">
          {product?.name}
        </h5>

        {/* Pricing Section */}

        <div className="mb-4">
          {product.discount === 'active_discount' ? (
            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm text-theme line-through">
                {nairaFormat(product.price)}
              </p>
            

              <p className="text-lg font-semibold text-primary">
                {nairaFormat(
                  ((product.discount_amount || 0)),
                )}
              </p>
            </div>
          ) : (
            <p className={`text-lg font-semibold ${newInventory < 1 ? 'text-gray-500 bg-gray-200 rounded' : 'text-primary'}`}>
              {nairaFormat(product.price)}
            </p>
          )}
        </div>

        <button
          disabled={newInventory < 1}
          className={`${newInventory < 1 ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'}  w-full inline-block mt-auto   text-white py-2.5 rounded-lg font-medium transition-colors duration-200`}
          onClick={() => navigate(`/productdetails/${product.id}`)}
        >
          Buy Now
        </button>
      </div>
    </div>

  );
};

export default ProductCard;

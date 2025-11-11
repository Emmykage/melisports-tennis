import React from 'react';
import { useDispatch } from 'react-redux';
import { nairaFormat } from '../../utils/nairaFormat';

const AdminProductCard = ({ product, toEdit, setSelectedProduct }) => {
  const dispatch = useDispatch();
  return (
    <div key={product.id} className="products-display pt-0 border relative">

      {product?.last_updated
       && (
       <div className="py-2 my-1 top-4 z-40 absolute bg-theme/90 text-sm rounded-xl  ml-2 px-2">
         <span className="font-semibold text-gray-200">Last updated: </span>
         <span className="text-sm font-medium text-orange-600">
           {product?.last_updated}
           {' '}
         </span>
       </div>
       )}

      <span className="absolute z-40 top-20 sm:top-5 right-5 flex justify-center items-center bg-primary/70 h-10 rounded-full w-10 text-white">
        {product?.product_quantity}

      </span>

      <div className="prod-img bg-white group">
        <a>
          <img src={product.photo_urls ? product.photo_urls[0] : product.image} alt={product.name}
                    className="w-full md:h-full h-52 object-contain  transfor group-hover:scale-105 transition duration-300"
 />
        </a>

      </div>
      <div className="prod-details text-center pt-2">
        <h5 className="text-gray-900 font-medium">
          {product.name.substring(0, 15)}
          ...
        </h5>
        <p>{nairaFormat(product.price)}</p>

        <div className="flex justify-between px-4">

          <a
            className="btn btn-outline max-width my-1 px-2 py-1 text-center"
            onClick={() => setSelectedProduct(product)}
          >
            Achive
          </a>
          <a className="btn btn-outline max-width my-1 px-2 py-1 text-center" onClick={() => toEdit(product.id)}>
            Edit
          </a>
        </div>

      </div>
    </div>
  );
};

export default AdminProductCard;

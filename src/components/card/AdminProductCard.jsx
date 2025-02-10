import React from 'react';
import { useDispatch } from 'react-redux';
import { nairaFormat } from '../../utils/nairaFormat';
import { openDelModal } from '../../redux/modal/delModal';
import localDateString from '../../utils/dateString';

const AdminProductCard = ({ product, toEdit }) => {
  const dispatch = useDispatch();
  return (
    <div key={product.id} className="products-display pt-0 border relative">

      {product?.last_updated && 
       <div className="py-2 my-1 last absolute bg-theme/90 text-sm rounded-xl  ml-2 px-2">
        <span className='font-semibold text-gray-200'>Last updated: </span>
        <span className="text-sm font-medium text-orange-600">{product?.last_updated}</span>
       </div>
      }
     


      <div className="prod-img">
        <a>
          <img src={product.photo_urls ? product.photo_urls[0] : product.image} alt={product.name} />
        </a>

      </div>
      <div className="prod-details text-center">
        <h5 className="text-gray-900">
          {product.name.substring(0, 15)}
          ...
        </h5>
        <p>{nairaFormat(product.price)}</p>
        <a
          className="btn btn-outline max-width my-1 py-1 text-center"
          onClick={() => dispatch(openDelModal(product.id))}
        >
          Delete
        </a>
        <a className="btn btn-outline max-width text-center py-1" onClick={() => toEdit(product.id)}>
          Edit
        </a>

      </div>
    </div>
  );
};

export default AdminProductCard;

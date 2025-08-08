import React from 'react';
import { useDispatch } from 'react-redux';
import { nairaFormat } from '../../utils/nairaFormat';
import { openDelModal } from '../../redux/modal/delModal';
import localDateString from '../../utils/dateString';

const AdminProductCard = ({ product, toEdit }) => {
  const dispatch = useDispatch();
  return (
    <div key={product.id} className="products-display pt-0 border relative">

      {product?.last_updated
       && (
       <div className="py-2 my-1 top-4  absolute bg-theme/90 text-sm rounded-xl  ml-2 px-2">
         <span className="font-semibold text-gray-200">Last updated: </span>
         <span className="text-sm font-medium text-orange-600">{product?.last_updated} </span>
       </div>
       )}

     

       <span className='absolute top-5 right-5 flex justify-center items-center bg-primary/70 h-10 rounded-full w-10 text-white'>
        5

       </span>



      <div className="prod-img bg-red-200 ">
        <a>
          <img src={product.photo_urls ? product.photo_urls[0] : product.image} alt={product.name} />
        </a>

      </div>
      <div className="prod-details text-center pt-2">
        <h5 className="text-gray-900 font-medium">
          {product.name.substring(0, 15)}
          ...
        </h5>
        <p>{nairaFormat(product.price)}</p>

        <div  className='flex justify-between px-4'>

        <a
          className="btn btn-outline max-width my-1 px-2 py-1 text-center"
          onClick={() => dispatch(openDelModal(product.id))}
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

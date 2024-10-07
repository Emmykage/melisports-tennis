import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../../pages/Loader';
import { getProduct, getProducts } from '../../../redux/actions/product';
import { openDelModal } from '../../../redux/modal/delModal';

const Products = () => {
  const NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const { updater } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [updater]);
  const toEdit = (id) => {
    dispatch(getProduct(id));
    navigate(`/admin/edit/${id}`);
  };

  if (status === 'success') {
    if (products.length < 1) {
      return (
        <div>
          <header>

            <h1 className="warning-center"> Please Add some products to your collection</h1>
          </header>
        </div>
      );
    }

    return (

      <div className="w-full grid lg-grid-col-3 sm-grid-col-2 xl-grid-col-3 grid-col-5 gap-3">

        {products.map((product) => (
          <div key={product.id} className="products-display">
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
              <p>{NGNaira.format(product.price)}</p>
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

        ))}

      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div>
        <h2>
          {' '}
          {error}
        </h2>
      </div>
    );
  }

  return (
    <Loader />
  );
};

export default Products;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Loader from '../../../pages/Loader';
import { getProduct, getProducts } from '../../../redux/actions/product';
import { openDelModal } from '../../../redux/modal/delModal';
import { naira_format } from '../../../utils/naira_format';
import Search from '../../search/Search';
import { filterProducts } from '../../../redux/products/product';
import AdminProductCard from '../../card/AdminProductCard';
import { resetProduct } from '../../../redux/product/product';

const Products = () => {
  const navigate = useNavigate();
  const {
    products, sortedProducts, message, error,
  } = useSelector((state) => state.products);
  const { updater } = useSelector((state) => state.product);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    products.length == 0 && dispatch(getProducts());
  }, [updater]);

  const toEdit = (id) => {
    dispatch(getProduct(id));
    navigate(`/admin/edit/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() == '') {
      dispatch(resetProduct());
    } else {
      dispatch(filterProducts(e.target.value.trim()));
    }
  };

  if (!error) {
    return (
      <>

        <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

        {products.length < 1
          ? (
            <div>
              <header>

                <h1 className="warning-center"> Please Add some products to your collection</h1>
              </header>
            </div>
          )

          : (
            <div className="w-full grid lg-grid-col-3 sm-grid-col-2 xl-grid-col-3 grid-col-5 gap-3 my-6">

              {!search == '' ? sortedProducts.map((product) => (
                <AdminProductCard product={product} key={product.id} toEdit={toEdit} />

              )) : products.map((product) => (
                <AdminProductCard product={product} key={product.id} toEdit={toEdit} />

              ))}
            </div>
          )}
      </>

    );
  }

  return (
    <div>
      <h2>
        {' '}
        {message}
      </h2>
    </div>
  );

  return (
    <Loader />
  );
};

export default Products;

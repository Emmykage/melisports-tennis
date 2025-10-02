import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct, getProducts, searchedProducts } from '../../../redux/actions/product';
import Search from '../../../components/search/Search';
import AdminProductCard from '../../../components/card/AdminProductCard';

const Products = () => {
  const navigate = useNavigate();
  const {
    products, searched_products, message, error, loading,
  } = useSelector((state) => state.products);
  const { updater } = useSelector((state) => state.product);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    products.length === 0 && dispatch(getProducts());
  }, [updater]);

  const toEdit = (id) => {
    dispatch(getProduct(id));
    navigate(`/admin/edit/${id}`);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    const cleanedValue = value.trim().replace(/\s+/g, ' ');
    setTimeout(() => {
      dispatch(searchedProducts({ search: cleanedValue }));
    }, 100);

    setSearch(e.target.value);
  };

  if (!error) {
    return (
      <div>

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
            <div className="w-full grid py-10 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 my-6">

              {searched_products.length > 0 ? searched_products.map((product) => (
                <AdminProductCard product={product} key={product.id} toEdit={toEdit} />

              )) : products.map((product) => (
                <AdminProductCard product={product} key={product.id} toEdit={toEdit} />

              ))}
            </div>
          )}
      </div>

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
};

export default Products;

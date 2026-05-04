import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProduct, getProducts, searchedProducts } from '../../../redux/actions/product';
import Search from '../../../components/search/Search';
import AdminProductCard from '../../../components/card/AdminProductCard';
import AppLoader from '../../../components/loader/AppLoader';
import ProdDelModal from '../../../components/modal/ProdDelModal';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products, searched_products, message, error, loading, searchLoading,

  } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();
  const timeoutRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    products.length === 0 && dispatch(getProducts());
  }, []);

  const toEdit = (id) => {
    dispatch(getProduct(id));
    navigate(`/admin/edit/${id}`);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\s+/g, ' ');
    setSearch(cleanedValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      console.log('triggered', cleanedValue);
      dispatch(searchedProducts({ search: cleanedValue }));
    }, 500);
  };

  console.log(searchLoading, 'hey', loading);

  if (!error) {
    return (
      <>
        <ProdDelModal open={!!selectedProduct} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} onCancel={() => setSelectedProduct(null)} />

        <div>

          <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

          {loading ? <AppLoader /> : products.length < 1
            ? (
              <div>
                <header>

                  <h1 className="warning-center"> Please Add some products to your collection</h1>
                </header>
              </div>
            )

            : (
              <div className="w-full ">

                {searched_products.length > 0
                  ? (
                    <div className="w-full grid py-10 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 my-6">
                      {searched_products.map((product) => (
                        <AdminProductCard product={product} key={product.id} toEdit={toEdit} setSelectedProduct={setSelectedProduct} />

                      ))}

                    </div>
                  ) : (
                    <div className="w-full grid py-10  grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 my-6">
                      {' '}
                      { products.map((product) => (
                        <AdminProductCard product={product} key={product.id} toEdit={toEdit} setSelectedProduct={setSelectedProduct} />

                      ))}
                    </div>
                  )}
              </div>
            )}
        </div>

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
};

export default Products;

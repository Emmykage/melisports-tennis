import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SimilarItemsSection from '../similarSection/SimilarItemSection';
import { getSimilarProducts } from '../../redux/actions/product';

const ProductsPageContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { relatedProducts, loading, relatedError } = useSelector((state) => state.products);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSimilarProducts());
  }, []);

  return (
    <div className="product-container">

      <div className=" py-10 px-4 md:px-10  max-w-[1600px] m-auto">
        {children}

      </div>

      <div className="max-w- prod-page m-auto px-4">

        <SimilarItemsSection items={relatedProducts} loading={loading} error={relatedError} onSelect={({ id }) => navigate(`/productdetails/${id}`)} />
      </div>

    </div>
  );
};
export default ProductsPageContainer;

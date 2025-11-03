import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/product';
import { getProductCategories } from '../redux/actions/product_category';

const useFilter = ({
  productCategory = null,
  selectedSports = null,
  selectedFeatures=null,
  selectedlevels=null,


}) => {
  const dispatch = useDispatch();
    const { product_categories } = useSelector((state) => state.product_categories);
    const { products, error, loading } = useSelector((state) => state.products);
  

  useEffect(() => {
    dispatch(getProducts({
      category: productCategory,
      sport: selectedSports,
      features: selectedFeatures,
      level: selectedlevels, selectedlevels

    }));
  }, [productCategory, selectedSports, selectedFeatures]);

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);


  return {products, error, loading, product_categories}
};

export default useFilter;

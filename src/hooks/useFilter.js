import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/product';
import { getProductCategories } from '../redux/actions/product_category';

const useFilter = ({
  productCategory = null,
  selectedSports = null,

}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({
      category: productCategory,
      sport: selectedSports,

    }));
  }, []);

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);
};

export default useFilter;

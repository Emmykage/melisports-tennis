import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/product';
import { getProductCategories } from '../redux/actions/product_category';

const useFilter = ({
  productCategory = null,
  selectedSports = null,
  selectedFeatures = null,
  selectedLevels = null,
  selectedCapacities = null,
  selectedGenders = null,
  productDiscount = false,

}) => {
  const dispatch = useDispatch();
  const { product_categories } = useSelector((state) => state.product_categories);
  const { products, error, loading } = useSelector((state) => state.products);

  console.log(selectedCapacities);
  useEffect(() => {
    dispatch(getProducts({
      category: productCategory,
      sport: selectedSports,
      features: selectedFeatures,
      level: selectedLevels,
      gender: selectedGenders,
      capacity: selectedCapacities,
      discount: productDiscount,

    }));
  }, [productCategory, selectedSports, selectedGenders, selectedLevels, selectedFeatures]);

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  return {
    products, error, loading, product_categories, productCategory,
  };
};

export default useFilter;

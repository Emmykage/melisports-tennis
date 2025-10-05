import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions/product';
import { getProductCategories } from '../redux/actions/product_category';
import {
  filterCapacity, filterGenders, filterLevels, filterPlayerType, filterSports,
} from '../redux/products/product';

const useFilter = ({
  productCategory = null,
  selectedSports = null,
  selectedLevels = null,
  selectedPlayType = null,
  selectedFeatures = null,
  selectedGenders = null,
  selectedCapacities = null,
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

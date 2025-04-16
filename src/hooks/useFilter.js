import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/product";
import { getProductCategories } from "../redux/actions/product_category";
import { filterLevels, filterSports } from "../redux/products/product";

const useFilter = ({
    productCategory,
    selectedSports,
    selectedLevels,
    selectedFeatures
}) => {
      const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProducts({
            category: productCategory
        }))
      },[])

      useEffect(() => {
          dispatch(getProductCategories());

      },[])


        useEffect(() => {
          if (selectedSports.length > 0) { // Only filter if there's a selection
            dispatch(getProducts({
                category: productCategory
            })).then(() => {
              dispatch(filterSports(selectedSports));
            });
          }
        }, [selectedSports, dispatch]);

        // select professional level for sport 
          useEffect(() => {
            if (selectedLevels.length > 0) { // Only filter if there's a selection
              dispatch(getProducts()).then(() => {
                dispatch(filterLevels(selectedLevels));
              });
            }
          }, [selectedLevels, dispatch]);


            // filter features based on description 

          useEffect(() => {
            if (selectedFeatures.length > 0) { // Only filter if there's a selection
              dispatch(getProducts()).then(() => {
                dispatch(filterFeatures(selectedFeatures));
              });
            }
          }, [selectedFeatures, dispatch]);


}

export default useFilter
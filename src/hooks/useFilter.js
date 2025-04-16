import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/product";
import { getProductCategories } from "../redux/actions/product_category";
import { filterCapacity, filterGenders, filterLevels, filterSports } from "../redux/products/product";

const useFilter = ({
    productCategory=null,
    selectedSports=null,
    selectedLevels=null,
    selectedFeatures=null,
    selectedGenders=null,
    selectedCapacities=null
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
          if (selectedSports?.length > 0) { // Only filter if there's a selection
            dispatch(getProducts({
                category: productCategory
            })).then(() => {
              dispatch(filterSports(selectedSports));
            });
          }else{
            dispatch(getProducts({
            
                category: productCategory
            
            }))
        }
        }, [selectedSports, dispatch]);

        // select professional level for sport 
          useEffect(() => {
            if (selectedLevels?.length > 0) { // Only filter if there's a selection
              dispatch(getProducts()).then(() => {
                dispatch(filterLevels(selectedLevels));
              });
            }else{
                dispatch(getProducts({
                
                    category: productCategory
                
                }))
            }
          }, [selectedLevels, dispatch]);


            // filter features based on description 

          useEffect(() => {
            if (selectedFeatures?.length > 0) { // Only filter if there's a selection
              dispatch(getProducts()).then(() => {
                dispatch(filterFeatures(selectedFeatures));
              });
            }else{
                dispatch(getProducts({
                
                    category: productCategory
                
                }))
            }
          }, [selectedFeatures, dispatch]);


        //   filter genders 
        useEffect(() => {
            if (selectedGenders?.length > 0) {
              dispatch(getProducts({
                
                category: productCategory
            
            })).then(() => {
                dispatch(filterGenders(selectedGenders));
              });
            }else{
                dispatch(getProducts({
                
                    category: productCategory
                
                }))
            }
          }, [selectedGenders]);


        //   filter capacity array 

        
        useEffect(() => {
            if (selectedCapacities.length > 0) { // Only filter if there's a selection
            dispatch(getProducts({
                
                category: productCategory
            
            })).then(() => {
                dispatch(filterCapacity(selectedCapacities));
            });
            }else{
            dispatch(getProducts({
                
                category: productCategory
            
            }))
            }

        
        }, [selectedCapacities, dispatch]);



}

export default useFilter
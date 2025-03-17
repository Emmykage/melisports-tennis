import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/banner/Hero';
import SideNav from '../../components/sideNav/SideNav';
import { getProducts } from '../../redux/actions/product';
import bannerImage from '../../assets/images/banner/2023-01_BAB_Banner_70_pourcents_Propulse_Fury_1365x510px-2.avif';
import { closeList } from '../../redux/products/searched';
import { getProductCategories } from '../../redux/actions/product_category';
import Loader from '../Loader';
import { filterFeatures, filterProducts, filterSports } from '../../redux/products/product';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';
import { classLevels, classSports } from './categories';

const itemsFeatures = [{
  type: "clay",
  label: "Clay"
},
{
  type: "grass",
  label: "Grass"
}]



const ShoesPage = () => {
  const dispatch = useDispatch();

  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
    const [selectedSports, setSelectedSports] = useState([]);
  
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const category = product_categories?.find((cat) => cat.name === 'shoe');

  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(getProducts()).then(() => {
      dispatch(filterProducts(lowerCaseSieve));
    });
  };

  const handleFilteredActivities = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterActivities(e.target.value));
      });
    } else {
      dispatch(getProducts());
    }
  };

  

  const handleFilteredFeatures = (e) => {
    const {checked, value} = e.target
    checked ? 
     setSelectedFeatures(prev => [...prev, value])  : setSelectedFeatures(prev => prev.filter(item => item !== value))
    
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };


    

  const handleFilteredLevels = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLevels((prev) => [...prev, value]);
    } else {
      setSelectedLevels((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(()=> {
    if(selectedFeatures.length > 0){

  
    dispatch(getProducts({
      category: 'shoe',
      sport: 'Tennis',
    })).then(() => {
      dispatch(filterFeatures(selectedFeatures));
    });}
  },[selectedFeatures])
  useEffect(() => {
    if (selectedLevels.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterLevels(selectedLevels));
      });
    }
  }, [selectedLevels, dispatch]);
  useEffect(() => {
    if (selectedSports.length > 0) { // Only filter if there's a selection
      dispatch(getProducts()).then(() => {
        dispatch(filterSports(selectedSports));
      });
    }
  }, [selectedSports, dispatch]);

  useEffect(() => {
    dispatch(closeList());
    dispatch(getProducts(
      { category: 'shoe' },
    ));
    dispatch(getProductCategories());
  }, []);

  return (
    <div className="product-container">
      <Nav />

      <Hero image={bannerImage} title="Shoes" />

      <div className="prod-page">
        <div className="cat-group justify-between max-w-md my-6">
          <button className="btn" onClick={() => handleFilteredProducts('pure aero')}> Men</button>
          <button className="btn" onClick={() => handleFilteredProducts('pure strike')}> Women</button>
          <button className="btn" onClick={() => handleFilteredProducts('boost')}> Kids</button>
          {/* <button className="btn" onClick={() => dispatch(getProducts())}>All shoes</button> */}

        </div>
        <div className="flex md:gap-10">
          <div className="side-nav bg-white shadow">
            <div className="side-row">
              <h6>Activities</h6>

            </div>
            <div />
            <div className="side-row">
                {classSports.map(item => (
                  <div className="flex items-center">

                    <input 
                    onChange={handleSportFilter}
                    type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="tennis" style={{ fontSize: '1rem' }} className="flex items-center">    
                      <span>
                        {item.label}
                      </span>
                    </label>
                  </div>
                ))}
                
              

            </div>
            <div className="side-row">
              <h6>Court Type</h6>

              {itemsFeatures.map(item => (
                <div className="flex items-center">
                <input type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredFeatures} />

                <label htmlFor="clay" style={{ fontSize: '1rem' }}>
                {item.label}
                </label>

              </div>
              ))}

              
             

            </div>
            <div className="side-row">
              <h6>Skill level</h6>

              {classLevels.map(item => (
                <span className="flex items-center">
                <label htmlFor="beginner" style={{ fontSize: '1rem' }}>
                  <input type="checkbox" id={item.level} value={item.level} onChange={handleFilteredLevels} className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                  {item.label}
                </label>
              </span>
              ))}
              

             

            </div>
            <div className="side-row">
              <h6>Brand</h6>
              <div className="flex items-center">
                <input onChange={handleFilteredActivities} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="activity" style={{ fontSize: '1rem' }}>

                  babolat
                </label>

              </div>

            </div>

          </div>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align w-full">
              <div className="product-items">
                <ProductsGrid filter="shoe" products={products} status={status} error={error} />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS SHOES</h3>
                <p>

                  { category.description}
                </p>

              </div>
            </div>
          ) : (
            <div className="text-center full-length">
              <h2>{error}</h2>
            </div>
          ))}

          <div />

        </div>
      </div>
    </div>
  );
};

export default ShoesPage;

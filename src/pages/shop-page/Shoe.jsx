import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/banner/Hero';
import { getProducts } from '../../redux/actions/product';
import bannerImage from '../../assets/images/banner/2023-01_BAB_Banner_70_pourcents_Propulse_Fury_1365x510px-2.avif';
import { closeList } from '../../redux/products/searched';
import { getProductCategories } from '../../redux/actions/product_category';
import Loader from '../Loader';
import { filterCapacity, filterFeatures, filterGenders, filterProducts, filterSports } from '../../redux/products/product';
import ProductsGrid from '../../components/products/ProductsGridDisplay';
import Nav from '../../components/nav/Nav';

import useFilter from '../../hooks/useFilter';
import { classSports } from '../../constants/categories';
import SideNav from '../../components/sideNav/SideNav';

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

  const [selectedCapacities, setSelectedCapacities] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
    const [selectedSports, setSelectedSports] = useState([]);
  
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);
  const category = product_categories?.find((cat) => cat.name === 'shoe');
  useFilter({
    productCategory: "shoe",
    selectedSports,
    selectedLevels,
    selectedCapacities
  })
  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase();
    dispatch(getProducts()).then(() => {
      dispatch(filterGenders([lowerCaseSieve]));
    });
  };

  const handleFilteredActivities = (e) => {
    if (e.target.checked) {
      dispatch(getProducts({
        category: "shoe"
      })).then(() => {
        dispatch(filterActivities(e.target.value));
      });
    } 
  };

  

  const handleFilteredCapacities = (e) => {
    const {checked, value} = e.target
    checked ? 
     setSelectedCapacities(prev => [...prev, value])  : setSelectedCapacities(prev => prev.filter(item => item !== value))
    
  };

  const handleSportFilter = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSports((prev) => [...prev, value]);
    } else {
      setSelectedSports((prev) => prev.filter((item) => item !== value));
    }
  };



  return (
    <div className="product-container">
      <Nav />

      <Hero image={bannerImage} title="Shoes" />

      <div className="prod-page prod-page py-10 px-4 md:px-10  max-w-[1600px] m-auto">
        <div className="cat-group gap-6  max-w-md my-6">
          <button className="btn" onClick={() => dispatch(getProducts({ category: 'shoe'}))}>All shoes</button>

          <button className="btn" onClick={() => handleFilteredProducts('men')}> Men</button>
          <button className="btn" onClick={() => handleFilteredProducts('women')}> Women</button>
          <button className="btn" onClick={() => handleFilteredProducts('kids')}> Kids</button>

        </div>
        <div className="flex md:gap-10">
          <SideNav>
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
                <input type="checkbox" id={item.type} value={item.type} className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredCapacities} />

                <label htmlFor={item.type} style={{ fontSize: '1rem' }}>
                {item.label}
                </label>

              </div>
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
          </SideNav>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align w-full">
              <div className="product-items">
                <ProductsGrid filter="shoe" products={products} status={status} error={error} />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS SHOES</h3>
                <p>

                  { category?.description}
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

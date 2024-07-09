import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../components/sideNav/SideNav';
import Hero from '../components/banner/Hero';
import Apparels from '../components/products/Apparels';
import { getProducts } from '../redux/actions/product';
import imageBanner from '../assets/images/banner/BABcup_1365x510-Version-1_no_logo.avif';
import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import Loader from './Loader';
import { filterProducts } from '../redux/products/product';

const ApparelsPage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { product_categories, loading } = useSelector((state) => state.product_categories);

  const category = product_categories?.find((cat) => cat.name === 'apparel');
  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.loLowerCase();

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
      // console.log(e.target.checked)
    }
  };

  const handleFilteredFeatures = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterFeatures(e.target.value));
      });
    } else {
      dispatch(getProducts());
      // console.log(e.target.checked)
    }
  };
  
  const handleFilterGender = (e) => {
    if (e.target.checked) {
      dispatch(getProducts()).then(() => {
        dispatch(filterGender(e.target.value));
      });
    } else {
      dispatch(getProducts());
      // console.log(e.target.checked)
    }
  };
  

  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProducts());
  }, []);
  return (
    <div className="product-container">
      <Hero image={imageBanner} title="Apparels" />
      <div className="prod-page">
        <div className="cat-group">
          <button className="btn" onClick={() => handleFilteredProducts('men')}> Men</button>
          <button className="btn" onClick={() => handleFilteredProducts('women')}> Women</button>
          <button className="btn" onClick={() => handleFilteredProducts('kids')}> Kids</button>
          <button className="btn" onClick={() => dispatch(getProducts())}>All Apparels</button>

        </div>

        <div className="flex md:gap-10">
          <div className="side-nav bg-white shadow">
            <div className="side-row">
              <h6>Activities</h6>

            </div>
            <div />
            <div className="side-row">

              <div className='mb-2 flex items-center'>
              <input type="checkbox" id="tennis" value="tennis" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

              <label htmlFor="tennis" style={{ fontSize: '1rem' }} className="flex items-center">
              <span>
                  Tennis
                </span>
              </label>
               
              </div>
    <div className='flex items-center'>
    <input type="checkbox" id="badminton" value="badminton" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

              <label htmlFor="badminton" style={{ fontSize: '1rem' }}>
              Badminton
              </label>
             

              </div>

            </div>
            <div className="side-row">
              <h6>Category</h6>

              <div className="flex items-center">
                <input type="checkbox" id="men" value="men" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilterGender} />

                <label htmlFor="men" style={{ fontSize: '1rem' }}>
                  Men
                </label>

              </div>
              <div className="flex items-center">

                <input onChange={handleFilterGender} value="women" type="checkbox" id="women" className="mr-3 w-4 h-4 text-blue-600 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="women" style={{ fontSize: '1rem' }}>
                  Women
                </label>
              </div>
              

            </div>

            {/* <div className="side-row">
              <h6>Skill level</h6>
              <span className="flex items-center">
                <label htmlFor="beginner" style={{ fontSize: '1rem' }}>
                  <input type="checkbox" id="beginner" value="beginner" onChange={handleFilteredActivities} className="w-4 h-4 text-blue-600 bg-gray-500 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3" />
                  Beginner
                </label>
              </span>

              <span>
                <label htmlFor="professional">
                  <input onChange={handleFilteredActivities} value="professional" type="checkbox" name="professional" id="professional" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  Professional
                </label>

              </span>
              <span className="flex items-center">
                <input onChange={handleFilteredActivities} value="intermediate" type="checkbox" id="intermediate" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                <label htmlFor="intermediate" style={{ fontSize: '1rem' }}>
                  Intermediate
                </label>

              </span>

              <span className="items-center flex">
                <input type="checkbox" id="advanced" value="advanced" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleFilteredActivities} />

                <label htmlFor="advanced" style={{ fontSize: '1rem' }}>
                  Advanced
                </label>

              </span>

            </div> */}
            <div className="side-row">
              <h6>Brand</h6>
<div className='flex items-center'>
<input onChange={()=> dispatch(getProducts())} value="babolat" type="checkbox" id="babolat" className="mr-3 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label htmlFor="activity" style={{ fontSize: '1rem' }}>
              babolat
              </label>
</div>
            
              
            </div>

          </div>
          {status == 'waiting' || loading ? <Loader /> : ((status == 'success') ? (
            <div className="product-align">
              <div className="product-items">
                <Apparels products={products} status={status} error={error} />

              </div>

              <div className="product-details">
                <h3> BABOLAT TENNIS APPARELS BRANDS</h3>
                <p>

                  {category.description}
                </p>

              </div>
            </div>
          ) : (
            <div className="text-center full-length">
              <h2>{error}</h2>
            </div>
          )) }

        </div>

      </div>

    </div>
  );
};

export default ApparelsPage;

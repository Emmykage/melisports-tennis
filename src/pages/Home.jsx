import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeList } from '../redux/products/searched';
import FeaturedProducts from '../components/partials/FeaturedProducts';
import { getCategories } from '../redux/category/categories';
import Babolat from '../assets/images/product-brands/Homepage_Brands_BabolatB.jpg';
import Oasics from '../assets/images/product-brands/Homepage_Brands_AsicsB.jpg';
import Head from '../assets/images/product-brands/Homepage_Brands_HeadB.jpg';

import Slider from '../components/feature/Slider';
import { closeNav } from '../redux/modal/nav';
import string from '../../src/assets/images/stringing.jpg'
import distributor from '../../src/assets/images/distributor.avif'
import { NavLink } from 'react-router-dom';

const Home = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getCategories);
  }, []);
  return (
    <>
     
      <Slider />

      <div className='service-offer py-2'>
        <div className='flex justify-space gap-1'>
          <div className='serv-box flex-1 relative'> 
            <img src={string}/>
            <div className='absolute overlay'>
              <h3 className='white'>Stringing racquets</h3>

            </div>
          </div>
          <div className='serv-box flex-1 relative'> 
            <img src={string}/>
            <div className='absolute overlay'>
              <h3 className='white'>Stringing racquets</h3>

            </div>

          </div>

        </div>
        <div>
          <div className='serv-box flex-1 relative'>
              <img src={distributor}/>
              <div className='absolute overlay'>
                <div className=''>
                  <h3 className='white'>Wholesale Distribution</h3>
                  <NavLink to={'/distributor'} className='btn block m-auto px-4 py-3 '>Become a Distributor</NavLink>

                </div>
                
               

              </div>
            </div>

        </div>

       
          
      </div>
      <div className="m-h4">
        <h3 className="center fs-3 m-h2"> Featured Products</h3>

        <div className="feature-div gap-2 m-auto flex-center-around">
          {categories.map((category) => (
            <FeaturedProducts
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
            />
          ))}

        </div>

      </div>
      <div>
        <div className="product-grid fit-screen">
          <div className="product-grid-items">
            <img src={Babolat} alt="" />
          </div>
          <div className="product-grid-items">
            <img src={Head} alt="" />
          </div>
          <div className="product-grid-items">
            <img src={Oasics} alt=""/>
          </div>
       
        </div>
        <div className="banner-text full-screen m-h5 text-center">
          <h2>
            Tennis Equipment & Supplies
          </h2>
          <p>
            "Love tennis? We specialize in Babolat tennis equipment, offering a wide range of rackets, strings, bags, and accessories to help you perform at your best. Our expert staff is passionate about the sport and can guide you through our selection to find the perfect gear for your game. Come in and experience the power and precision of Babolat, exclusively at our tennis retail store."

          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

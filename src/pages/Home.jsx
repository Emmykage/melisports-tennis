import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeList } from '../redux/products/searched';
import { Banner } from '../components/banner/Banner';
import FeaturedProducts from '../components/partials/FeaturedProducts';
import { getCategories } from '../redux/category/categories';
import Babolat from '../assets/images/product-brands/Homepage_Brands_BabolatB.jpg'
import Adidas from '../assets/images/product-brands/Homepage_Brands_adidas.jpg'
import Oasics from '../assets/images/product-brands/Homepage_Brands_AsicsB.jpg'
import Head from '../assets/images/product-brands/Homepage_Brands_HeadB.jpg'
import Wilson from '../assets/images/product-brands/Homepage_Brands_Wilson.jpg'
// import { Slide } from '@mui/material';
import Slider from '../components/feature/Slider';
import { closeNav } from '../redux/modal/nav';


const Home = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav())
    dispatch(closeList())
    dispatch(getCategories);
  }, []);
  return (
    <>
      {/* <Banner /> */}
      <Slider/>
      <div className="m-h4">
        <h3 className="center fs-3 m-h2"> Featured Products</h3>

        <div className="feature-div m-auto flex-center-around">
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
        <div className='product-grid fit-screen'>
          <div className='product-grid-items'>
            <img src={Babolat} alt="" />
          </div>
          <div className='product-grid-items'>
            <img src={Head} alt="" />
          </div>
          <div className='product-grid-items'>
            <img src={Oasics} alt="" />
          </div>
          <div className='product-grid-items'>
            <img src={Wilson} alt="" />
          </div>
          <div className='product-grid-items'>
            <img src={Adidas} alt="" />
          </div>
        </div>
        <div className='banner-text full-screen m-h5'>
          <h2>
          Tennis Equipment & Supplies
          </h2>
          <p>
          For more than 30 years, Tennis-Point has served as one of the world's premier tennis equipment suppliers. As one of the top online tennis stores with a tennis warehouse of 40,000 sq. ft., we offer a comprehensive selection and fast shipping of tennis supplies that few retailers can match. We also have one of the largest in-stock inventories of tennis equipment online, with 10s of thousands of products available for shipping from our automated warehouse.

We value innovation and have personally tailored our products to highlight your skills on the court. Our well-trained staff are intimately familiar with tennis equipment (many of them tennis players themselves) and can help you find that perfect tennis racquet, tennis shoe or tennis clothing that is sure to put you ahead of the competition. Our selections of tennis equipment are consistently first-to-market and we pride ourselves in stocking our tennis warehouse with the newest products at the lowest prices. Be sure to visit us on Twitter, Facebook and YouTube to learn of our latest sales and discounts on tennis supplies. Tennis-Point - Pure Tennis.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeList } from '../redux/products/searched';
import { Banner } from '../components/banner/Banner';
import FeaturedProducts from '../components/partials/FeaturedProducts';
import { getCategories } from '../redux/category/categories';
import Babolat from '../assets/images/product-brands/Homepage_Brands_BabolatB.jpg';
import Adidas from '../assets/images/product-brands/Homepage_Brands_adidas.jpg';
import Oasics from '../assets/images/product-brands/Homepage_Brands_AsicsB.jpg';
import Head from '../assets/images/product-brands/Homepage_Brands_HeadB.jpg';
import Wilson from '../assets/images/product-brands/Homepage_Brands_Wilson.jpg';
// import { Slide } from '@mui/material';
import Slider from '../components/feature/Slider';
import { closeNav } from '../redux/modal/nav';

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
      {/* <Banner /> */}
      <Slider />
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
        <div className="product-grid fit-screen">
          <div className="product-grid-items">
            <img src={Babolat} alt="" />
          </div>
          <div className="product-grid-items">
            <img src={Head} alt="" />
          </div>
          <div className="product-grid-items">
            <img src={Oasics} alt="" />
          </div>
          {/* <div className='product-grid-items'>
            <img src={Wilson} alt="" />
          </div> */}
          {/* <div className='product-grid-items'>
            <img src={Adidas} alt="" />
          </div> */}
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

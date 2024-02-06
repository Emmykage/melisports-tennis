import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { closeList } from '../redux/products/searched';
import FeaturedProducts from '../components/partials/FeaturedProducts';
import { getCategories } from '../redux/category/categories';
import Babolat from '../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../assets/images/logo/melisport_one.png';
import demo_service from '../assets/images/babolat-demo.jpg';

import Slider from '../components/feature/Slider';
import { closeNav } from '../redux/modal/nav';
import string from '../assets/images/stringing.jpg';
import distributor from '../assets/images/distributor.jpeg';

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

      <div className="service-offer py-2">
        <div className="flex justify-space gap-1">
          <div className="serv-box flex-1 relative top">
            <img src={string} />
            <div className="absolute overlay">
              <h3 className="white font-normal">Stringing racquets</h3>

            </div>
          </div>
          <div className="serv-box flex-1 relative top w-full">
            <img src={demo_service} className="w-full" />
            <div className="absolute overlay">
              <h3 className="white font-normal">Demo Program</h3>

            </div>

          </div>

        </div>
        <div>
          <div className="serv-box flex-1 relative bottom">
            <img src={distributor} />
            <div className="absolute overlay">
              <div className="">
                <h3 className="white font-normal">Wholesale Distribution</h3>
                <NavLink to="/distributor" className="btn block m-auto px-4 py-3 ">Become a Distributor</NavLink>

              </div>

            </div>
          </div>

        </div>

      </div>
      <div className="m-h4">
        <h3 className="center fs-3 m-h2"> Shop Categories</h3>

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
      <div className="banner-text full-screen m-h5 text-center">
        <h2>
          Tennis Equipment & Supplies
        </h2>
        <h3>Love Racquets Sports?</h3>
        <p className="text-pry">

           We specialize in Babolat tennis, Badminton and Padel equipment, offering a wide range of rackets, strings, bags, and accessories to help you perform at your best. Our expert staff are passionate about the sport and can guide you through our selections to find the perfect gear for your game. Come in and experience the power and precision of Babolat, exclusively at our retail store.

        </p>
      </div>
      <div>
        <div className="product-grid fit-screen">
        <div className="product-grid-items flex justify-center items-align text-center">
            <img src={Babolat} className="w-full" alt="" />
          </div>
          <div className="product-grid-items flex justify-center items-align text-center">
            <img src={melisport} className="w-full" alt="" />
          </div>

        </div>

      </div>
    </>
  );
};

export default Home;

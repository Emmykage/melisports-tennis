import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Babolat from '../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../../assets/images/logo/melisport_one.png';
import demo_service from '../../assets/images/demo.webp';
import shoeImage from '../../assets/images/banner/Jet_Tere_692x364_1.avif';
import badmington from '../../assets/images/banner/X-feel_692_x_364_px.avif';
import string from '../../assets/images/babolat_stringing.webp';
import distributor from '../../assets/images/distributor.jpeg';
import Slider from '../../components/feature/Slider';
import ReactSlider from '../../components/slider/CategoriesSlider';
import { getSportCategories } from '../../redux/actions/product_category';
import { closeNav } from '../../redux/modal/nav';
import { closeList } from '../../redux/products/searched';
import SurveyButton from '../../components/feature/survey-button';
import CommunityBanner from '../../components/banner/CommunityBanner';
import DiscoverBtn from '../../components/buttons/DiscoverBtn';

const Home = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getSportCategories);
  }, []);
  return (
    <>

      <Slider />

      <div className="py-2 service-prod">
        <div className="grid md:grid-cols-2 overflow-hidden  gap-1">
          <div className="relative item top h-52 md:h-80">
            <img src={string} className="w-full h-full" />
            <div className="absolute overlay flex items-center justify-center bg-theme/20">
              <h3 className="white font-normal">Stringing racquets</h3>

            </div>
          </div>
          <div className="relative item top h-52 md:h-80">
            <img src={demo_service} className="w-full" />
            <div className="absolute overlay flex items-center justify-center  bg-theme/20">
              <h3 className="white font-normal">Demo Program</h3>

            </div>

          </div>

        </div>
        <div className=" bg-gray-500 my-2">
          <div className="relative item top h-52 md:h-80 xl:h-[500px]">
            <img src={distributor} className="h-full w-full" />
            <div className="absolute overlay flex items-center justify-center bg-theme/20">
              <div className="">
                <h3 className="white font-normal">Wholesale Distribution</h3>
                <div className="w-max bg-red-400 m-auto ">
                  <DiscoverBtn btnText="Become a Distributor" link="/distributor" />

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
      <div>
        <div className="flex m-auto section-container gap-2">
          <NavLink to="/" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={shoeImage} alt="" className=" w-full h-full" />
          </NavLink>
          <NavLink to="/" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={badmington} alt="" className="w-full h-full" />
          </NavLink>
        </div>

      </div>
      <div className="my-6">
        <h3 className=" text-center fs-3 my-3"> Shop Categories</h3>

        <div className="px-3 boder max-w-[1500px] ma m-auto h-96 w-full my-7  border-black">
          <ReactSlider categories={categories} />
        </div>

      </div>

      <div className="banner-text full-screen my-3 text-center">
        <h2>
          Tennis Equipment & Supplies
        </h2>
        <h3>Love Racquets Sports?</h3>
        <p className="text-pry">

          We specialize in Babolat tennis, Badminton and Padel equipment, offering a wide range of rackets, strings, bags, and accessories to help you perform at your best. Our expert staff are passionate about the sport and can guide you through our selections to find the perfect gear for your game. Come in and experience the power and precision of Babolat, exclusively at our retail store.

        </p>
      </div>
      <SurveyButton />

      <div>
        <div className="product-grid fit-screen">
          <div className="product-grid-items flex justify-center items-align text-center">
            <img src={Babolat} className="w-full" alt="" />
          </div>
          <div className="product-grid-items flex justify-center items-align text-center">
            <img src={melisport} className="w-full" alt="" />
          </div>

        </div>

        <CommunityBanner />

      </div>
    </>
  );
};

export default Home;

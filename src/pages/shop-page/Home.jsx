import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Babolat from '../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../../assets/images/logo/melisport_one.png';
import demo_service from '../../assets/images/babolat-demo.jpg';
import shoeImage from '../../assets/images/banner/Jet_Tere_692x364_1.avif';
import badmington from '../../assets/images/banner/X-feel_692_x_364_px.avif';
import string from '../../assets/images/stringing.jpg';
import distributor from '../../assets/images/distributor.jpeg';
import Slider from '../../components/feature/Slider';
import ReactSlider from '../../components/slider/ReactSlider';
import { getSportCategories } from '../../redux/actions/product_category';
import { closeNav } from '../../redux/modal/nav';
import { closeList } from '../../redux/products/searched';
import SurveyButton from '../../components/feature/survey-button';
import VideoView from '../../components/banner/Video';
import CollectImage from '../../assets/images/banner/692x364_FW_Lebron_1.avif'
import RangeImage from '../../assets/images/banner/Satelite_692x364__px.avif'
import DiscoverBtn from '../../components/buttons/DiscoverBtn';
import ProductSlider from './component/ProductSlider';
import Tennis from '../../assets/images/banner/Cat_product_tennis.avif'
import Padel from '../../assets/images/banner/Cat_product_padel.avif'
import Badminton from '../../assets/images/banner/test_badminton.avif'
import './home.scss'
const ShopHome = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getSportCategories);
  }, []);
  return (
    <>

      <VideoView />
      <section className='px-3'>
      <div className='grid gap-6 md:grid-cols-2 max-w-7xl m-auto my-6'>
        <div className=''>
          <div className='h-60 md:h-96'>
            <img src={CollectImage} alt="collection Image" className='object-cover h-full' />
          </div>
          <div className='flex py-4 justify-between'>
            <h3 className='text-xs md:text-base'>NEW JUAN LEBRON COLLECTION</h3>
            <DiscoverBtn btnText={"Discover"}/>
          </div>
        </div>
        <div className=''>
          <div className='h-60 md:h-96'>
            <img src={RangeImage} alt="collection Image" className='h-full'/>
          </div>
          <div className='flex py-4 justify-between'>
            <h3 className='text-xs md:text-base'>NEW JUAN LEBRON COLLECTION</h3>
            <DiscoverBtn btnText={"Discover"}/>
          </div>
        </div>
      </div>

      </section>

      <section className='px-4 py-10 bg-white/90 my-10'>
        <div className='max-w-7xl m-auto feature'>
          <h3 className='text-3xl text-center my-4'>Feature</h3>
          <ProductSlider/>
          
        </div>
      </section>

      <section className='px-4 bg-theme py-32'>
        <div className='grid gap-10 md:grid-cols-3 m-auto max-w-[1400px]'>
    <div className='relative zoom-effect overflow-hidden'>
      
      <img src={Tennis} alt="" className='w-full h-full hover:scale-105'/>
      <NavLink to={"/racquets"} className='absolute flex top-0 left-0 h-full w-full '>
        <h3 className='mt-auto mb-10 text-3xl text-white ml-10'>Tennis</h3>

      </NavLink>
    </div>
    <div className='relative zoom-effect overflow-hidden'>
      <img src={Padel} alt="" className='w-full h-full hover:scale-105'/>
      <NavLink to={"/padels"} className='absolute flex top-0 left-0 h-full w-full '>
        <h3 className='mt-auto mb-10 text-3xl text-white ml-10'>Padel</h3>

      </NavLink>
    </div>
    <div className='relative zoom-effect overflow-hidden'>
      <img src={Badminton} alt=""  className='w-full h-full'/>
      <NavLink to={"/badminton"} className='absolute flex top-0 left-0 h-full w-full '>
        <h3 className='mt-auto mb-10 text-3xl text-white ml-10'>Badminton</h3>

      </NavLink>
    </div>
        </div>

      </section>

      <div>
        <div className="flex m-auto section-container gap-2">
          <NavLink to="/store" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={shoeImage} alt="" className=" w-full h-full" />
          </NavLink>
          <NavLink to="/store" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={badmington} alt="" className="w-full h-full" />
          </NavLink>
        </div>

      </div>
      <div className="my-6">
        <h3 className=" text-center fs-3 my-3"> Shop Categories</h3>

        <div className='px-3 boder max-w-[1500px] ma m-auto h-96 w-full my-7  border-black'>
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

      </div>
    </>
  );
};

export default ShopHome;

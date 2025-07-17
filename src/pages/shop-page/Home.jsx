import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Babolat from '../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../../assets/images/logo/melisport_one.png';
import shoeImage from '../../assets/images/banner/Jet_Tere_692x364_1.avif';
import badmington from '../../assets/images/banner/X-feel_692_x_364_px.avif';

import ReactSlider from '../../components/slider/CategoriesSlider';
import { getSportCategories } from '../../redux/actions/product_category';
import { closeList } from '../../redux/products/searched';
import SurveyButton from '../../components/feature/survey-button';
import CollectImage from '../../assets/images/banner/692x364_FW_Lebron_1.avif';
import RangeImage from '../../assets/images/banner/Satelite_692x364__px.avif';
import DiscoverBtn from '../../components/buttons/DiscoverBtn';
import ProductSlider from '../../components/slider/ProductSlider';
import Tennis from '../../assets/images/banner/Cat_product_tennis.avif';
import Padel from '../../assets/images/banner/Cat_product_padel.avif';
import Badminton from '../../assets/images/banner/test_badminton.avif';
import './home.scss';
import videoAd from '../../assets/videos/master_of_Strings_1920x720.webm';
import VideoComp from '../../components/video-comp/VideoComp';
import HomeEquipmentInfo from '../../components/HomeEquipmentInfo/HomeEquipmentInfo';
import Reviews from '../../components/reviews/Reviews';
import Nav from '../../components/nav/Nav';
import { getProducts } from '../../redux/actions/product';

const ShopHome = () => {
  const categories = useSelector((state) => state.categories);
  const { products, latestArrival } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeList());
    dispatch(getSportCategories());
    dispatch(getProducts())
  }, []);

  return (
    <>
      <Nav />
      <section className="px-4 bg-theme py-32">
        <div className="grid gap-10 md:grid-cols-3 m-auto max-w-[1400px]">
          <div className="relative zoom-effect overflow-hidden">

            <img src={Tennis} alt="" className="w-full h-full hover:scale-105" />
            <NavLink to="/racquets" className="absolute flex top-0 left-0 h-full w-full ">
              <h3 className="mt-auto mb-10 text-2xl bg-theme-darker/40 px-6 py-3 tracking-widest rounded text-light ml-10">Tennis</h3>

            </NavLink>
          </div>
          <div className="relative zoom-effect overflow-hidden">
            <img src={Padel} alt="" className="w-full h-full hover:scale-105" />
            <NavLink to="/padels" className="absolute flex top-0 left-0 h-full w-full ">
              <h3 className="mt-auto mb-10 text-xl md:text-2xl tracking-widest bg-theme-darker/40 px-6 py-3  rounded text-light ml-10">Padel</h3>

            </NavLink>
          </div>
          <div className="relative zoom-effect overflow-hidden">
            <img src={Badminton} alt="" className="w-full h-full" />
            <NavLink to="/badminton" className="absolute flex top-0 left-0 h-full w-full ">
              <h3 className="mt-auto mb-10 text-2xl bg-theme-darker/40 px-6 py-3 tracking-widest rounded text-light ml-10">Badminton</h3>

            </NavLink>
          </div>
        </div>

      </section>
      <section className="px-4 py-10 bg-white/90 my-10">
        <div className="max-w-7xl m-auto feature">
          <h3 className="text-3xl text-center my-4">Products </h3>
          <ProductSlider products={products} views={4} />

        </div>
      </section>

      {/* <VideoView/> */}
      {/* <VideoComp videoAd={videoAd} /> */}
      <section className="px-3">
        <div className="grid gap-6 md:grid-cols-2 max-w-7xl m-auto my-6">
          <div className="">
            <div className="h-60 md:h-96">
              <img src={CollectImage} alt="collection Image" className="object-cover h-full" />
            </div>
            <div className="flex py-4 justify-between">
              <h3 className="text-xs md:text-base">NEW JUAN LEBRON COLLECTION</h3>
              <DiscoverBtn btnText="Discover" />
            </div>
          </div>
          <div className="">
            <div className="h-60 md:h-96">
              <img src={RangeImage} alt="collection Image" className="h-full" />
            </div>
            <div className="flex py-4 justify-between">
              <h3 className="text-xs md:text-base">NEW JUAN LEBRON COLLECTION</h3>
              <DiscoverBtn btnText="Discover" />
            </div>
          </div>
        </div>

      </section>

      <section className="px-3  py-20">
        <h3 className="text-2xl text-center">
          {' '}
          <NavLink className="hover:text-primary" to="/arrivals"> New Arrival</NavLink>
        </h3>
        <div className="m-auto max-w-7xl my-6 bg-white p-4 md:p-10 border rounded shadow-sm">
          {latestArrival.length > 0 ? <ProductSlider products={latestArrival} views={4} /> : <span className='text-xl block font-medium text-center'> New Arrivals will be updated Soon</span> }

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
      <div className="my-6 bg-white py-10">
        <h3 className=" text-center font-medium  text-3xl my-3"> Shop Categories</h3>

        <div className="px-3 boder max-w-[1500px] ma m-auto h-96 w-full my-7 bg-white border-black">
          <ReactSlider categories={categories} />
        </div>

      </div>



      <HomeEquipmentInfo />
      <SurveyButton />
      <Reviews />

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

      {/* <Reviews/> */}

    </>
  );
};

export default ShopHome;

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import Slide1 from '../../assets/images/banner/slide_one.jpg';
import Slide3 from '../../assets/images/banner/slide_three.jpeg';
import videoAdd from '../../assets/videos/EDIT_BABOLAT_REVEAL_RAQUETTE_3D_1920-720_20231201.webm'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import './styles.css';

// import required modules

export default function Slider() {
  return (
    <>
      <div className="slide">

        <Swiper
      //  navigation={true}
          loop
          effect="fade"
          autoplay

      //  slidesPerView={1}
      //  spaceBetween={30}
          modules={[EffectFade, Autoplay]}
          className="mySwiper"
        >
           {/* <SwiperSlide>
            <video src={videoAdd} controls autoplay muted loop></video>
          </SwiperSlide> */}
          <SwiperSlide>
            {' '}
            <img src={Slide1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Slide3} />
          </SwiperSlide>
         

        </Swiper>
      </div>
      <video src={videoAdd} autoPlay loop muted ></video>
    </>
  );
}

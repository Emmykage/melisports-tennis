import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import Slide1 from '../../assets/images/banner/slide_one.jpg';
import Slide3 from '../../assets/images/banner/slide_three.jpeg';
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

    </>
  );
}

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Slide1 from "../../assets/images/banner/slide_one.jpg"
import Slide2 from  "../../assets/images/banner/slide_two.jpg"
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


import "./styles.css";

// import required modules
import { Navigation, EffectFade, Autoplay } from "swiper";

export default function Slider() {
  return (
    <>
    <div className="slide">


      <Swiper
      //  navigation={true} 
       loop={true}
      effect={"fade"}
      autoplay={true}
        
      //  slidesPerView={1}
      //  spaceBetween={30}
       modules={[EffectFade, Autoplay]} 
       className="mySwiper">
        <SwiperSlide> <img src={Slide1}/></SwiperSlide>
        <SwiperSlide><img src={Slide2} /></SwiperSlide>
     
      </Swiper>
      </div>
    </>
  );
}
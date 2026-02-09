import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, EffectFade, Autoplay, Pagination,
} from 'swiper';


import padelX from '../../assets/images/banner/padel_xclusive.webp';
import banner1 from '../../assets/images/banner/banner.png';
import banner2 from '../../assets/images/banner/banner2.png';
import gifSales from '../../assets/gif/sales-elite.gif';
import gifSales2 from '../../assets/gif/sales-padel.gif';

const SliderAd = () => {
  return (
             <Swiper
                loop
                effect='cube'      
                centeredSlides
                  autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                modules={[Pagination, Autoplay, EffectFade]}
            
            className="mySwiper h-full"
          >
            <SwiperSlide>
               <img
              src={banner1}
              alt="add banner"
              className="object-fill md:object-fill h-full w-full cursor-pointer hover:scale-105 transition duration-500"
              onClick={() => navigate('/sales')}
            />
            </SwiperSlide>
              
          </Swiper> )
}

export default SliderAd
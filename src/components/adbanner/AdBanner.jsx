import React from 'react';
import { useNavigate } from 'react-router-dom';

import padelX from '../../assets/images/banner/padel_xclusive.webp';
import banner1 from '../../assets/images/banner/banner.png';
import banner2 from '../../assets/images/banner/banner2.png';
import gifSales from '../../assets/gif/sales-elite.gif';
import gifSales2 from '../../assets/gif/sales-padel.gif';
import {Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, EffectFade, Autoplay, Pagination,
} from 'swiper';
const AdBanner = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="max-w-[1400px] my-10 md:h-[800px] m-auto flex  flex-col  lg:flex-row gap-4 px-4 lg:px-0 lg:py-0">
        <div className="md:w-96 h-full group bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
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
            
            // modules={[Swiper.Autoplay, Swiper.Pagination]}
            className="mySwiper h-full"
          >
            <SwiperSlide>
              
             <img
            src={gifSales2}
            alt="x-mas sales banner"
            className="w-full h-full object-fill md:object-fill cursor-pointer group-hover:scale-105 transition duration-500"
            onClick={() => navigate('/sales')}

          />
          
            </SwiperSlide>
             <SwiperSlide>
              
             <img
            src={gifSales}
            alt="x-mas sales banner"
            className="w-full h-full object-fill md:object-fill cursor-pointer group-hover:scale-105 transition duration-500"
            onClick={() => navigate('/sales')}
            
          />
          
            </SwiperSlide>

          </Swiper>
         

        </div>
        <div className="flex flex-1 flex-col gap-4">
          

          <div className="md:flex-1 group h-80 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

               <img
              src={banner1}
              alt="add banner"
              className="object-fill md:object-fill h-full w-full cursor-pointer hover:scale-105 transition duration-500"
              onClick={() => navigate('/sales')}
            />
  
           
          </div>
          {' '}
          <div className="md:flex-1 group h-80 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={banner2}
              alt="add banner"
              className="object-fill md:object-fill h-full w-full cursor-pointer group-hover:scale-105 transition duration-500"
              onClick={() => navigate('/sales')}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdBanner;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { nairaFormat } from '../../utils/nairaFormat';

const ProductSlider = ({ products, views = 4 }) => {
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="slide">

      <Swiper
        loop
        speed={700}
        slidesPerView={mobileView ? 1 : views}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
        modules={[EffectFade, Autoplay]}
        spaceBetween={10}

        className="mySwiper"
      >

        {products?.slice(0, 12).map((item) => (
          <SwiperSlide key={item.id}>

            <div className="relative h-96 w-full rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 group">
              {/* New badge */}
              {item.new_product && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md shadow-md z-20">
                New
              </div>
              )}

              {/* Product Image */}
              <NavLink to={`/productdetails/${item?.id}`} className="block h-full">
                <img
                  src={item?.photo_urls ? item?.photo_urls[0] : item?.image}
                  alt={item?.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </NavLink>

              {/* Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/60">
                <p className="text-sm text-gray-200 italic">{item?.sport_category?.name}</p>
                <h3 className="text-lg font-semibold text-white truncate">{item?.name}</h3>
                <p className="text-xl font-bold text-primary mt-2">{nairaFormat(item?.price)}</p>
              </div>

              {/* Hover Reveal Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-primary/90 text-center py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white font-medium">{item?.name}</p>
              </div>
            </div>

            {' '}
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default ProductSlider;

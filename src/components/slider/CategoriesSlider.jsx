import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';

const CatSlider = ({ categories, views = 3 }) => {
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
    <div className="h-96">
      <Swiper
      spaceBetween={20}
        loop // Equivalent to infinite scrolling
        speed={700} // Equivalent to the speed setting in slick
        slidesPerView={mobileView ? 1 : views} // Equivalent to slidesToShow
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
        pagination={{ clickable: true }} // Equivalent to dots
        modules={[Navigation, Pagination, Autoplay]} // Include Pagination for dots, Navigation if you want next/prev arrows
        className="mySwiper"
      >
        {categories?.map((item, index) => (
         <SwiperSlide key={index}>
    <div
      key={item.id}
      className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-md group"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
        <NavLink
          to={`/${item.name}`}
          className="text-white text-xl md:text-2xl font-semibold tracking-wide drop-shadow-lg hover:text-primary transition-colors"
        >
          {item.name}
        </NavLink>
      </div>
    </div>
  </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default CatSlider;

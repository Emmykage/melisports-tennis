import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Slide3 from '../../assets/images/banner/slide_three.jpeg';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';

const ReactSlider = ({ categories }) => {
    const [mobileView, setMobileView] = useState(false)
    useEffect(()=> {
        const handleResize = () => {
            setMobileView(window.innerWidth < 768)
        }


        handleResize()


      window.addEventListener("resize",handleResize)


      return ()=> window.removeEventListener("resize", handleResize)
    },[])


    console.log(mobileView)
  return (
    <div className='h-96'>
      <Swiper
        loop={true}  // Equivalent to infinite scrolling
        speed={700}  // Equivalent to the speed setting in slick
        slidesPerView={ mobileView ? 1 : 3}  // Equivalent to slidesToShow
        autoplay={{ delay: 3000, disableOnInteraction: false }}  // Autoplay configuration
        pagination={{ clickable: true }}  // Equivalent to dots
        modules={[Navigation, Pagination, Autoplay]}  // Include Pagination for dots, Navigation if you want next/prev arrows
        className="mySwiper"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div key={item.id} className='h-96  block mx-1 shrink-0 relative  border swiper-category'>
              <div className='h-full'>
                <img src={item.image} className='w-full h-full' alt={`Slide ${index}`} />
              </div>
              <h3 className='overlay flex justify-center items-center absolute bottom-0  text-center w-full bg-black h-full bg-theme/20 text-white  text-3xl'>
              
              <NavLink to={`/${item.name}`} className={"hover:text-primary"}>
              {item.name}

              </NavLink>
              
              </h3>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default ReactSlider;

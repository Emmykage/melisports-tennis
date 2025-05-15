import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper';

import Slide1 from '../../assets/images/banner/slide_one.jpg';

import photoOne from '../../assets/images/ngo/IMG-20250513-WA0021.jpg'
import photoTwo from '../../assets/images/ngo/IMG-20250513-WA0027.jpg'
import photoThree from '../../assets/images/ngo/IMG-20250513-WA0028.jpg'

import './styles.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import './styles.css';
import DiscoverBtn from '../buttons/DiscoverBtn';

const SecondarySlider = () => {
    const images  = [
      {
        id: 0,
        image: Slide1,
       
      }, {
        id: 1,
        image: photoOne,
        cta: "Support the Program",
        position: "left",
        title: "Changing Lives, One Swing at a Time!",
        text: "Our NGO is dedicated to giving underprivileged kids a chance to learn, grow, and thrive through the game of tennis. Join us as we serve hope and opportunity!"
        ,
        link: "/support-the-program"
      },
       {
        id: 2,
        image: photoTwo,
        title: "Tennis Enrollment Now Open!",
        text: "We are enrolling kids aged 6–16 into our free tennis training program. Equipment, coaching, and mentorship—all at no cost. Limited slots available!",
        cta: "Apply Now",
        link: "/enroll-a-child",

        position: "right"
      },
       {
        id: 3,
        title: "🎉 Upcoming Tennis Camp & Tournament!",
        text: "Don’t miss our exciting youth tennis camp this summer! A week of training, games, and fun for kids enrolled in our program. Be a part of the action!",
        cta: "View Event Details",
        image: photoThree,
        link: "/upcoming-event"
      }
    ]
  return (
    <>
      <div className="slide py-0 bg h-full">

        <Swiper
            loop
            effect="fade"
            // speed={700} // Equivalent to the speed setting in slick
            // autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
            pagination={{ clickable: true }} // Equivalent to dots
            // modules={[Navigation, Pagination, Autoplay]} // Include Pagination for dots, Navigation if you want next/prev arrows
            slidesPerView={1}
            spaceBetween={30}
            className="mySwiper"
        >
         {images.map(item => (
            <SwiperSlide key={item.id}>
              <div className='md:h-screen h-[500px] relative'>
                <div className=' w-full  bg-gray-800/60 absolute flex justify-center items-center  h-full top-0 left-0 '>

               {item?.title && <div className={`max-w-7xl m-auto flex h-3/4  items-center ${ item?.position === "left" ? "justify-start" : "justify-end" } w-full`}>
                  <div className='max-w-md mx-4 bg-gray-900/60 p-4 rounded-lg w-full'>
                    <p className='text-3xl text-gray-200 text-center'>{item.title}</p>
                    <p className='text-gray-200 leading-8 my-3 text-xl text-center'>{item.text}</p>
                    <DiscoverBtn
                    link={item.link}

                    className={"block m-auto mt-10"}
                    btnText={item.cta}>

                    </DiscoverBtn>
                  </div>


                </div>
}

                </div>

                <img src={item.image} className='h-full object-cover'/>
              </div>

            </SwiperSlide>
           
         ))}
        
      
        </Swiper>
      </div>

    </>
  );
}

export default SecondarySlider
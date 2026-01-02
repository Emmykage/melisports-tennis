import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, EffectFade, Autoplay, Pagination,
} from 'swiper';

import Slide1 from '../../assets/images/banner/slide_one.jpg';

import photoOne from '../../assets/images/ngo/IMG-20250513-WA0021.jpg';
import photoTwo from '../../assets/images/ngo/IMG-20250513-WA0027.jpg';
import photoThree from '../../assets/images/ngo/IMG-20250513-WA0028.jpg';
import xmasBanner from '../../assets/images/banner/1600w-erqHOEi9bhI.webp';
import videoAdd from '../../assets/videos/EDIT_BABOLAT_REVEAL_RAQUETTE_3D_1920-720_20231201.webm';

import './styles.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import DiscoverBtn from '../buttons/DiscoverBtn';

const SecondarySlider = () => {
  const [mute, setMute] = useState(true);

  const images = [
    {
      id: 8,
      image: xmasBanner,
    },
    {
      id: 0,
      image: Slide1,

    },
    {
      id: 2,
      video: videoAdd,
    },
    //  {
    //   id: 1,
    //   image: bannerImg,
    //   cta: 'Support the Program',
    //   position: 'left',
    //   title: 'Changing Lives, One Swing at a Time!',
    //   text: 'Our NGO is dedicated to giving underprivileged kids a chance to learn, grow, and thrive through the game of tennis. Join us as we serve hope and opportunity!',
    //   link: '/support-the-program#support',
    // },
    // {
    //   id: 2,
    //   image: photoTwo,
    //   title: 'Tennis Enrollment Now Open!',
    //   text: 'We are enrolling kids aged 6–16 into our free tennis training program. Equipment, coaching, and mentorship—all at no cost. Limited slots available!',
    //   cta: 'Apply Now',
    //   link: '/support-the-program#enroll',

    //   position: 'right',
    // },
    // {
    //   id: 3,
    //   title: '🎉 Upcoming Tennis Camp & Tournament!',
    //   text: 'Don’t miss our exciting youth tennis camp this summer! A week of training, games, and fun for kids enrolled in our program. Be a part of the action!',
    //   cta: 'View Event Details',
    //   image: photoThree,
    //   link: '/support-the-program#event',
    // },
  ];
  return (
    <>
      <div className="relative w-full md:h-full">
        <Swiper
          loop
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          className="hero-swiper"
        >
          {images.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-[500px] md:h-screen w-full">
                {/* Background Image */}
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-fill"
                  />
                )
                  : (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted={mute}
                      playsInline
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Content */}
                <div className={`relative z-10 flex h-full items-center max-w-7xl mx-auto px-6 ${
                  item?.position === 'left' ? 'justify-start text-left' : 'justify-end text-right'
                }`}
                >
                  <div className="max-w-lg space-y-6 animate-fadeIn">
                    {item?.title && (
                    <>
                      <h2 className="text-3xl md:text-6xl font-medium text-white drop-shadow-lg">
                        {item.title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        {item.text}
                      </p>
                      <DiscoverBtn
                        link={item.link}
                        btnText={item.cta}
                        className="mt-6 px-6 py-3 text-lg font-semibold rounded-full bg-primary text-white hover:bg-primary/90 transition"
                      />
                    </>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </>
  );
};

export default SecondarySlider;

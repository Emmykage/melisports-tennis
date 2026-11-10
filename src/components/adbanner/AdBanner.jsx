import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper";

import shoesImg from "../../assets/images/ads/shoes.png";
import apparelSkirt from "../../assets/images/ads/babolat-play-skirt.png";
import ballDiscountImg from "../../assets/images/ads/balls_discount.jpeg";
import badmintonDiscountImg from "../../assets/images/ads/badminton_ad.jpeg";
import aeroImg from "../../assets/images/ads/pure_aero.jpeg";
import racketImg from "../../assets/images/ads/strings.jpeg";

const AdBanner = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="md:max-w-[1400px] w-full my-10 md:h-[800px] m-auto grid md:grid-cols-2 flex-col  lg:flex-row gap-4 px-4 lg:px-0 lg:py-0">
        <div className="sm:h-full h-80 group bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
          <Swiper
            loop
            effect="cube"
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
                src={ballDiscountImg}
                alt="x-mas sales banner"
                className="w-full h-full object-cover sm:object-fill md:object-fill cursor-pointer group-hover:scale-105 transition duration-500"
                onClick={() => navigate("/sales")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={badmintonDiscountImg}
                alt="x-mas sales banner"
                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition duration-500"
                onClick={() => navigate("/sales")}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="grid h-[800px] grid-cols-2 flex-1 flex-col gap-4">
          <div className="md:flex-1 group h-full md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={racketImg}
              alt="add banner"
              className="object-cover md:object-fill h-full w-full cursor-pointer group-hover:scale-105 transition duration-500"
              onClick={() => navigate("/sales")}
            />
          </div>{" "}
          <div className="md:flex-1 group h-full md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={aeroImg}
              alt="add banner"
              className="object-cover md:object-fill h-full w-full cursor-pointer group-hover:scale-105 transition duration-500"
              onClick={() => navigate("/sales")}
            />
          </div>{" "}
          <div className="md:flex-1 group h-full md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={apparelSkirt}
              alt="add banner"
              className="object-cover md:object-fill h-full w-full cursor-pointer group-hover:scale-105 transition duration-500"
              onClick={() => navigate("/sales")}
            />
          </div>{" "}
          <div className="md:flex-1 group h-full md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={shoesImg}
              alt="add banner"
              className="object-cover md:object-fill h-full w-full cursor-pointer group-hover:scale-105 transition duration-500"
              onClick={() => navigate("/sales")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdBanner;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoTennisballSharp } from 'react-icons/io5';
import { FaHandshake, FaSeedling, FaTrophy } from 'react-icons/fa';
import Babolat from '../../assets/images/logo/ba4886b10b-babolat-logo-babolat-logo-png-transparent-images-free-png-images-vector-psd.png';
import melisport from '../../assets/images/logo/melisport_one.png';
import demo_service from '../../assets/images/demo.webp';
import shoeImage from '../../assets/images/banner/Jet_Tere_692x364_1.avif';
import badmington from '../../assets/images/banner/X-feel_692_x_364_px.avif';
import string from '../../assets/images/babolat_stringing.webp';
import distributor from '../../assets/images/distributor.jpeg';
import Slider from '../../components/feature/Slider';
import ReactSlider from '../../components/slider/CategoriesSlider';
import { getSportCategories } from '../../redux/actions/product_category';
import { closeList } from '../../redux/products/searched';
import SurveyButton from '../../components/feature/survey-button';
import CommunityBanner from '../../components/banner/CommunityBanner';
import DiscoverBtn from '../../components/buttons/DiscoverBtn';
import videoAdd from '../../assets/videos/EDIT_BABOLAT_REVEAL_RAQUETTE_3D_1920-720_20231201.webm';
import VideoComp from '../../components/video-comp/VideoComp';
import HomeEquipmentInfo from '../../components/HomeEquipmentInfo/HomeEquipmentInfo';
import SportDirectory from '../../components/sportDirectory/SportDirectory';
import Reviews from '../../components/reviews/Reviews';
import NavInfo from '../../components/nav/NavInfo';
import SecondarySlider from '../../components/feature/secondary-slider';
import imgKids from '../../assets/images/ngo/IMG-20250513-WA0027.jpg';

const LandingHome = () => {
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeList());
    dispatch(getSportCategories);
  }, []);

  const ngoText = [
    {
      id: 1,
      icon: <IoTennisballSharp className="text-2xl" />,
      title: 'Free Tennis Training for Kids',
      text: 'We offer completely free tennis coaching to children aged 6–16, providing access to quality sports development regardless of financial background. Our goal is to make tennis accessible and enjoyable for every child.',
    },
    {
      id: 2,
      icon: <FaHandshake className="text-2xl" />,

      title: 'Equipment, Coaching & Mentorship',
      text: 'From rackets to professional guidance, we provide all the tools kids need to succeed. Beyond skills on the court, we offer mentorship to help them build confidence, discipline, and a sense of purpose.',
    },
    {
      id: 3,
      icon: <FaTrophy className="text-2xl" />,

      title: 'Exciting Camps & Tournaments',
      text: 'Our annual tennis camps and tournaments give children the chance to apply what they’ve learned in a fun, competitive, and supportive environment. It’s more than just play—it’s about growth, teamwork, and celebration.',
    },
    {
      id: 4,
      icon: <FaSeedling className="text-2xl" />,

      title: ' Creating Opportunity Through Sport',
      text: 'We’re not just teaching a game—we’re opening doors. Our programme helps children build life skills, develop healthy habits, and connect with positive role models, laying the foundation for a brighter future.',
    },
  ];
  return (
    <>

      <NavInfo />

      <SecondarySlider />
      <VideoComp videoAd={videoAdd} />
      <section className="xl:mx-60 py-10">

        <div className="py-2 service-prod flex gap-10 justify-between m-auto w-full max-w-[1800px] bg-gr">
          <div className="max-w-7xl h-[800px] w-full">

            <div className="grid md:grid-cols-2 overflow-hidden  gap-1">
              <div className="relative item top h-52 md:h-80">
                <img src={string} className="w-full h-full" />
                <div className="absolute overlay flex items-center justify-center bg-theme/20">
                  <h3 className="white font-normal">Stringing racquets</h3>

                </div>
              </div>
              <div className="relative item top h-52 md:h-80">
                <img src={demo_service} className="w-full h-full" />
                <div className="absolute overlay flex items-center justify-center  bg-theme/20">
                  <h3 className="white font-normal">Demo Program</h3>

                </div>

              </div>

            </div>
            <div className=" bg-gray- my-2">
              <div className="relative item top h-52 md:h-80 xl:h-[500px]">
                <img src={distributor} className="h-full w-full" />
                <div className="absolute overlay flex items-center justify-center bg-theme/20">
                  <div className="">
                    <h3 className="white font-normal">Wholesale Distribution</h3>
                    <div className="w-max m-auto ">
                      <DiscoverBtn btnText="Become a Distributor" link="/distributor" />

                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="hidden lg:block max-w-80 w-full h-[600px] shadow px-3 py-">
            <ul>
              <li className="my-4">
                <a href="#review" className="border rounded block p-3 shadow bg-gray-200/20">
                  {' '}
                  <h3 className="font-normal text-xl hover:text-primary">Write us a review</h3>
                </a>
              </li>
              <li className="my-4">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScUbwSfyzAwo5o1QNjkmOJgc_ILcoIFzvglgLUmZg7n2r4xfA/viewform?pli=1" target="_blank" className="border rounded block p-3 shadow bg-gray-200/20" rel="noreferrer">
                  {' '}
                  <h3 className="font-normal text-xl  hover:text-primary">Fill our survey</h3>
                </a>
              </li>

            </ul>
          </div>

        </div>
      </section>

      <div>
        <div className="flex m-auto section-container gap-2">
          <NavLink to="/" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={shoeImage} alt="" className=" w-full h-full" />
          </NavLink>
          <NavLink to="/" className="flex-1 zoom-hover h-52 md:h-80">
            <img src={badmington} alt="" className="w-full h-full" />
          </NavLink>
        </div>

      </div>
      <div className="my-6">
        <h3 className=" text-center fs-3 my-3"> Shop Categories</h3>

        <div className="px-3 boder max-w-[1500px] ma m-auto h-96 w-full my-7  border-black">
          <ReactSlider categories={categories} />
        </div>

      </div>

      <section className="px-4 py-20 bg-white">
        <div className="max-w-[1400px] gap-4 md:gap-10 m-auto grid md:grid-cols-2">

          <div className="bg-light p-4 rounded-lg">
            <h2 className="text-3xl my-4 font-normal">Serving Futures with Tennis</h2>
            <p className="text-gray-500 text-lg">
              We believe every child deserves the chance to play, grow, and succeed—which is why our tennis programme creates a nurturing space for kids to learn the sport, build confidence, and connect with a supportive community
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-5">
              {ngoText.map((item) => (
                <div>
                  <span className="bg-gray-900 flex mx-auto md:mx-0 justify-center items-center text-white w-14 h-14 rounded-full">
                    {item.icon}
                  </span>
                  <h5 className="text-lg my-4 font-semibold text-gray-900">{item.title}</h5>
                  <p className="text-gray-500 text-sm">
                    {item.text}
                    {' '}
                  </p>
                </div>
              ))}

            </div>

            <DiscoverBtn className="my-7" link="/support-the-program" btnText="Learn More">Discover Our Programmes</DiscoverBtn>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={imgKids} alt="kids images" className="w-full h-full object-cover" />
          </div>
        </div>

      </section>

      <HomeEquipmentInfo />
      <SportDirectory />
      <SurveyButton />

      <div>
        <div className="product-grid fit-screen">
          <div className="product-grid-items flex justify-center items-align text-center">
            <img src={Babolat} className="w-full" alt="" />
          </div>
          <div className="product-grid-items flex justify-center items-align text-center">
            <img src={melisport} className="w-full" alt="" />
          </div>

        </div>

        <Reviews id="review" />

        <CommunityBanner />

      </div>
    </>
  );
};

export default LandingHome;

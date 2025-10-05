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
import SecondarySlider from '../../components/feature/secondary-slider';
import imgKids from '../../assets/images/ngo/IMG-20250513-WA0027.jpg';
import Nav from '../../components/nav/Nav';

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

      <Nav store={false} />

      <SecondarySlider />
      <VideoComp videoAd={videoAdd} />

      <section className="py-12 px-4">
        <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-10 justify-between m-auto">

          {/* Left: Services */}
          <div className="max-w-7xl w-full mx-auto px-4 lg:px-0">
            {/* Top 2 Services */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={string}
                  alt="Stringing racquets"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/60">
                  <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    Stringing Racquets
                  </h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden shadow-md group">
                <img
                  src={demo_service}
                  alt="Demo Program"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/60">
                  <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    Demo Program
                  </h3>
                </div>
              </div>
            </div>

            {/* Distributor Card */}
            <div className="mt-4 h-52 md:h-60 relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src={distributor}
                alt="Wholesale Distribution"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/60">
                <div className="text-center space-y-3">
                  <h3 className="text-white text-lg md:text-xl font-semibold">
                    Wholesale Distribution
                  </h3>
                  <DiscoverBtn btnText="Become a Distributor" link="/distributor" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar (hidden on mobile) */}
          <div className="hidden lg:block max-w-xs w-full shadow-md rounded-xl bg-white/70 backdrop-blur p-4">
            <ul>
              <li className="my-4">
                <a href="#review" className="border rounded-lg block p-4 shadow-sm bg-gray-100/60 hover:bg-gray-200/60 transition">
                  <h3 className="font-normal text-lg hover:text-primary">Write us a review</h3>
                </a>
              </li>
              <li className="my-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScUbwSfyzAwo5o1QNjkmOJgc_ILcoIFzvglgLUmZg7n2r4xfA/viewform?pli=1"
                  target="_blank"
                  rel="noreferrer"
                  className="border rounded-lg block p-4 shadow-sm bg-gray-100/60 hover:bg-gray-200/60 transition"
                >
                  <h3 className="font-normal text-lg hover:text-primary">Fill our survey</h3>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="my-10 px-4 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NavLink
            to="/"
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={shoeImage}
              alt="Shoes"
              className="w-full h-52 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xl font-semibold tracking-wide">
                Tennis Shoes
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/"
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={badmington}
              alt="Badminton"
              className="w-full h-52 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xl font-semibold tracking-wide">
                Badminton Gear
              </span>
            </div>
          </NavLink>
        </div>
      </div>

      <div className="my-12">
        {/* Section Header */}
        <h3 className="text-center text-2xl md:text-3xl font-normal text-gray-800 mb-6">
          Shop Categories
        </h3>

        {/* Slider Container */}
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
            <ReactSlider categories={categories} />
          </div>
        </div>
      </div>

      <section className="px-4 py-10 bg-white">
        <div className="max-w-[1400px] m-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4">
          {/* Left Content */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-4xl font-medium text-gray-900 leading-snug">
              Serving Futures
              {' '}
              <br />
              {' '}
              with
              {' '}
              <h3 className="text-primary inline text-3xl font-medium">Tennis</h3>
            </h2>
            <p className="text-gray-600 text-base mt-4 leading-relaxed">
              Every child deserves the chance to play, grow, and succeed.
              Our tennis programme nurtures kids to learn the sport,
              build confidence, and connect with a supportive community.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {ngoText.map((item, index) => (
                <div key={index} className="text-center md:text-left">
                  <span className="bg-primary flex mx-auto md:mx-0 justify-center items-center text-white w-16 h-16 rounded-full shadow-md transition transform hover:scale-105">
                    {item.icon}
                  </span>
                  <h5 className="text-lg mt-4 font-semibold text-gray-900">
                    {item.title}
                  </h5>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <DiscoverBtn
              className="mt-10 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              link="/support-the-program"
              btnText="Learn More"
            >
              Discover Our Programmes
            </DiscoverBtn>
          </div>

          {/* Right Image */}
          <div className="rounded-2xl overflow-hidden bg-red-300 h-full shadow-lg">
            <img
              src={imgKids}
              alt="Kids learning tennis"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
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

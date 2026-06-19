import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoTennisballSharp } from "react-icons/io5";
import { FaHandshake, FaSeedling, FaTrophy } from "react-icons/fa";
import Container from "../components/container";
import AdBanner from "../components/adbanner/AdBanner";
import demo_service from "../assets/images/demo.webp";
import shoeImage from "../assets/images/banner/Jet_Tere_692x364_1.avif";
import badmington from "../assets/images/banner/X-feel_692_x_364_px.avif";
import string from "../assets/images/babolat_stringing.webp";
import distributor from "../assets/images/distributor.jpeg";
import ReactSlider from "../components/slider/CategoriesSlider";
import { getSportCategories } from "../redux/actions/product_category";
import SurveyButton from "../components/feature/survey-button";
import CommunityBanner from "../components/banner/CommunityBanner";
import DiscoverBtn from "../components/buttons/AppButton";
import HomeEquipmentInfo from "../components/HomeEquipmentInfo/HomeEquipmentInfo";
import SportDirectory from "../components/sportDirectory/SportDirectory";
import Reviews from "../components/reviews/Reviews";
// import SecondarySlider from "../../components/feature/secondary-slider";
import imgKids from "../assets/images/ngo/IMG-20250513-WA0027.jpg";
// import Nav from "../../components/nav/Nav";
import BrandsSponsorComponents from "../components/brandSponsors/BrandsSponsorComponents";
import { closeList } from "../redux/products/searched";
// import bannerImg from "../../assets/images/banner/banner-1.jpg";
// import bannerImgxmas from "../../assets/images/banner/melisport-christmas.jpeg";
// import AdBanner from "../../components/adbanner/AdBanner";
// import Container from "../../components/container";
// import Header from "../../components/header/Header";

const CommunityPage = () => {
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeList());
    dispatch(getSportCategories);
  }, []);

  const ngoText = [
    {
      id: 1,
      icon: <IoTennisballSharp className="text-2xl" />,
      title: "Free Tennis Training for Kids",
      text: "We offer completely free tennis coaching to children aged 6–16, providing access to quality sports development regardless of financial background. Our goal is to make tennis accessible and enjoyable for every child.",
    },
    {
      id: 2,
      icon: <FaHandshake className="text-2xl" />,

      title: "Equipment, Coaching & Mentorship",
      text: "From rackets to professional guidance, we provide all the tools kids need to succeed. Beyond skills on the court, we offer mentorship to help them build confidence, discipline, and a sense of purpose.",
    },
    {
      id: 3,
      icon: <FaTrophy className="text-2xl" />,

      title: "Exciting Camps & Tournaments",
      text: "Our annual tennis camps and tournaments give children the chance to apply what they’ve learned in a fun, competitive, and supportive environment. It’s more than just play—it’s about growth, teamwork, and celebration.",
    },
    {
      id: 4,
      icon: <FaSeedling className="text-2xl" />,

      title: " Creating Opportunity Through Sport",
      text: "We’re not just teaching a game—we’re opening doors. Our programme helps children build life skills, develop healthy habits, and connect with positive role models, laying the foundation for a brighter future.",
    },
  ];
  return (
    <Container>
      <section className="px-4 py-10 bg-white">
        <div className="max-w-[1400px] m-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4">
          {/* Left Content */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-4xl font-medium text-gray-900 leading-snug">
              Support a Child in Sport
              <h3 className="text-primary inline text-4xl font-medium">
                {" "}
                Tennis{" "}
              </h3>
              (SCSF)
            </h2>
            <p className="text-xl font-medium text-gray-900 leading-snug">
              ...Serving Futures with Tennis
            </p>
            <p className="text-gray-600 text-base mt-4 leading-relaxed">
              Every child deserves the chance to play, grow, and succeed. Our
              tennis programme nurtures kids to learn the sport, build
              confidence, and connect with a supportive community.
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

      <BrandsSponsorComponents />

      <Reviews id="review" />

      <CommunityBanner />
    </Container>
  );
};

export default CommunityPage;

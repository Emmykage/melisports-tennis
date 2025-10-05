import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Hero from '../components/banner/Hero';
import {
  FaCheckCircle, FaDollarSign, FaShippingFast, FaUsers,
} from 'react-icons/fa';
import nadal_art from '../../assets/images/nadal-art.png';
import AboutBanner from '../../components/banner/AboutBanner';
import CommunityBanner from '../../components/banner/CommunityBanner';
import NavInfo from '../../components/nav/NavInfo';
import Nav from '../../components/nav/Nav';

const About = () => (
  <div className="about customer-bg-theme text-white">

    <Nav store={false} />

    <AboutBanner />
    <section className="about-us bg-white text-gray-800 xl:mx-auto max-w-7xl mx-4  px-6 md:px-12 py-12 space-y-16">
      {/* Intro */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">More About Us</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Founded with a passion for sports and a commitment to serving the
            vibrant community of Nigerian sports enthusiasts, Melisports brings
            a fresh perspective to the world of sporting goods.
            <br />
            <br />
            Our mission is simple: to provide access to high-quality
            sports equipment and services that empower every individual to pursue
            their athletic goals.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={nadal_art}
            alt="About Melisports"
            className="rounded-2xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </div>

      {/* About Us Text */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-600 leading-relaxed">
            MeliSports is Nigeria’s specialist tennis wholesaler and retailer.
            We also stock racquet sports equipment and accessories,
            including badminton. Our world-class selection includes top brands
            for players of all ages and skill levels.
            <br />
            <br />
            Since 2014, we’ve been sourcing the best quality products and making
            them readily available locally and worldwide. Whether you’re a
            professional or just playing for fun, we’ve got you covered.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-md p-6">
          <p className="text-gray-700 leading-relaxed">
            At MeliSports, we work to deliver the best prices without compromising
            on quality or swift delivery. We collaborate with players, coaches,
            and clubs to build Nigeria’s tennis scene.
            <br />
            <br />
            Put us to the test today — we’re just a call away!
          </p>
        </div>
      </div>

      {/* Why Choose Us - Cards */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Melisports</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-primary text-3xl mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Local Expertise, Global Standards</h4>
            <p className="text-gray-600 text-sm">
              We understand Nigeria’s sports needs while providing international quality gear.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <FaDollarSign className="text-primary text-3xl mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Affordable & Valuable</h4>
            <p className="text-gray-600 text-sm">
              Top-notch sports equipment at competitive prices for everyone.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <FaUsers className="text-primary text-3xl mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Exceptional Service</h4>
            <p className="text-gray-600 text-sm">
              Our friendly, knowledgeable team is here to guide your sports journey.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <FaShippingFast className="text-primary text-3xl mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Fast & Reliable Delivery</h4>
            <p className="text-gray-600 text-sm">
              Get your gear quickly, in perfect condition, and ready for action.
            </p>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Join the Melisports Community</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Beyond being a retailer, Melisports is a community of
            like-minded individuals passionate about sports and an active lifestyle.
            Connect with us on social media, join our events, and be part of
            a growing network across Nigeria.
            <br />
            <br />
            Whether you’re a professional athlete, weekend warrior, or beginner —
            we’re here to support you every step of the way.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center">
          <h3 className="text-2xl font-semibold mb-2">Your Partner in Sports Excellence</h3>
          <p className="text-gray-700 leading-relaxed">
            Experience sports like never before with Melisports —
            your trusted partner in Nigerian sports excellence!
          </p>
        </div>
      </div>
    </section>

    <CommunityBanner />

  </div>
);

export default About;

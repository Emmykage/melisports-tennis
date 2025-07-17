import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import Hero from '../components/banner/Hero';
import nadal_art from '../../assets/images/nadal-art.png';
import AboutBanner from '../../components/banner/AboutBanner';
import CommunityBanner from '../../components/banner/CommunityBanner';
import NavInfo from '../../components/nav/NavInfo';

const About = () => (
  <div className="about customer-bg-theme text-white">

    <NavInfo />

    <AboutBanner />
    <section className='px-4'>


      <div className="about-us text-pry px-4">
        <div className="segment segment-one grid grid-cols-2 gap-2 my-3 py-6">
          <div className="flex justify-center items-align">
            <h2 className="text-white font-medium">More...</h2>
          </div>
          <div className="flex justify-center items-align p-2">
            <p className="w-max-400 text-white">
              Founded with a passion for sports and a commitment to serving the vibrant community of Nigerian sports enthusiasts, Melisports brings a fresh perspective to the world of sporting goods.
              <br />
              <br />
              {' '}
              Our mission is simple yet profound: to provide access to high-quality sports equipment and services that empower every individual to pursue their athletic goals.

            </p>

          </div>

        </div>
        <div className="grid grid-cols-2">
          <div className=" bg- text-center flex items-center justify-center">
            <div className="w-080 bg- ">
              <img src={nadal_art} alt="" className="w-full" />

            </div>

          </div>
          <div className="p-4 bg- text-sm">
            <div className="flex items-center">
              <hr className="w-50" />
              <span className="font-bold text-lg">About Us</span>
            </div>

            <p className="text-base font-semibold text-justify">
              MeliSports is a Nigeria specialist tennis whosaler and retailer, we also stock other racquet sports equipment and accessories, including badminton.
              We offer a world-class selection of brands named tennis equipment and apparel for players of all ages and styles. Whether as a professional or just playing for fun, we've got you covered.
              MeliSports sources the best quality products and makes them readily available to its local consumers and worldwide.
              <br />
              <br />
              Having been in the business since 2014, you can count on us to deliver the best equipment to help you attain your goals in your chosen sport.
              <br />
              <br />
              At MeliSport, we continuously work to offer the best prices possible without compromising on premium quality and swift delivery.
              <br />
              <br />
              We are always open to collaborating with players, coaches, and clubs to work within the tennis scene. It is mutually beneficial. The more you promote us, the more benefits you'll achieve.
              <br />
              <br />
              Put us to the test today. We are just a call away!

            </p>
          </div>
        </div>

        <div className="grid grid-cols-2  my-3 py-2 why-chose">

          <div className="font-normal to-bottom">
            <ul className="text-justify text-base">
              <li className="my-3 py-1">

                <p className="text-gray font-semibold">
                  {' '}
                  <strong className="spantara font-normal text-pry text-lg">Local Expertise, Global Standards: </strong>
                  As a proudly Nigerian company, we understand the unique needs of our community. Our curated selection of sports equipment meets international standards, ensuring that you have access to the best gear without compromise.
                </p>
              </li>

              <li className="my-2 py-1">

                <p className="text-gray font-semibold">
                  <strong className="spantara font-normal text-pry text-lg">Affordability and Value:</strong>
                  {' '}
                  We believe that everyone should have access to quality sports equipment without breaking the bank. Melisports is committed to offering competitive prices and value for money, making top-notch gear accessible to all.
                </p>
              </li>
              <li className="py-1 my-2">
                <p className="text-gray font-semibold">
                  <strong className="spantara font-normal text-pry text-lg">Exceptional Customer Service:</strong>
                  {' '}
                  Your satisfaction is our priority. Our knowledgeable and friendly team is here to assist you, providing expert advice to help you make informed decisions about the right equipment for your needs.
                </p>
              </li>
              <li className="py-4 py-3">
                <p className="text-gray font-semibold">
                  <strong className="spantara font-normal text-pry text-lg">Fast and Reliable Delivery:</strong>

                  We understand the excitement of getting your hands on new sports gear. That's why we offer fast and reliable delivery services, ensuring that your equipment reaches you in top condition and ready for action.
                </p>
              </li>
            </ul>

          </div>
          <div className="flex justify-center items-center to-top">
            <h2 className="text-3xl line-space font-medium">Why Choose Melisports:</h2>
          </div>
          <div />
        </div>
        <div className="segment items-center segment-three grid grid-cols-2 p-4">
          <div>
            <h2 className="text-3xl font-medium">Join the Melisports Community:</h2>
          </div>
          <p className="font-semibold text-dark text-justify">

            Beyond being a sports retailer, Melisports is a community of like-minded individuals who share a passion for fitness and an active lifestyle. Connect with us on social media, participate in our events, and be part of a growing network of sports enthusiasts across Nigeria.

            Whether you're a professional athlete, a weekend warrior, or someone just starting their fitness journey, Melisports is here to support you every step of the way. Elevate your game, embrace the joy of movement, and experience sports like never before with Melisports—your trusted partner in Nigerian sports excellence!
          </p>
        </div>

      </div>

          </section>

    <CommunityBanner />

  </div>
);

export default About;

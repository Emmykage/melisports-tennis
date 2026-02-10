import {
  FaPhone, FaWhatsapp, FaFacebook, FaInstagram,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Hero from '../../components/banner/Hero';

import bannerImage from '../../assets/images/banner/Babolat_NEWS-Banniere_1365x510_PureDrive21.webp';
import CommunityBanner from '../../components/banner/CommunityBanner';
import Nav from '../../components/nav/Nav';
import Container from '../../components/container';
import AppButton from '../../components/buttons/AppButton';

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormdata] = useState();
  const [delivered, setDelivered] = useState(false);

  const handleChange = (e) => {
    setFormdata({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(sendMessage(formData)).unwrap().then(
      (res) => setDelivered(true),
    ).catch((e) => setDelivered(false));
  };
  return (
    <div className="">
      <Nav store={false} />
      <Container>

        <Hero image={bannerImage} title="Contact Us" />

        <div className="contact-us ">

          <div className="grid max-w-7xl  my-4 -400 m-auto md:grid-cols-2 gap-6 bg- rounded-2xl shadow-lg p-6 md:p-10">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Need to get in touch with us?
                Fill out the form with your inquiry or reach us directly via phone or email.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="text-primary" />
                  <a
                    href="tel:+2347038723093"
                    className="hover:text-primary transition-colors"
                  >
                    +2347038723093
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-gray-700">
                  <MdEmail className="text-primary" />
                  <a
                    href="mailto:info@melisports.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@melisports.com
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 text-2xl mt-4">
                  <a
                    href="https://wa.me/+2347038723093?text=I'm%20interested%20in%20your%20product"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-500 transition-colors"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://web.facebook.com/melisports"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/melisports/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-pink-500 transition-colors"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>

              {delivered ? <h3>Message Has been recieved</h3>
                : (
                  <form
                    action="https://formspree.io/f/mgvylgrp"
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-4"
                  >
                    <input
                      name="name"
                      type="text"
                      placeholder="Full name"
                      onChange={handleChange}
                      required
                      minLength="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      maxLength="500"
                      required
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <AppButton
                      type="submit"
                      className="!w-full"
                    >
                    Send Message
                    </AppButton>
                  </form>
                )}
            </div>
          </div>
        </div>

        <CommunityBanner />
      </Container>

    </div>
  );
};

export default Contact;

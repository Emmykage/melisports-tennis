import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  FaPhone, FaWhatsapp, FaFacebook, FaInstagram,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Hero from '../components/banner/Hero';
import { closeNav } from '../redux/modal/nav';

import bannerImage from '../assets/images/banner/Babolat_NEWS-Banniere_1365x510_PureDrive21.webp';

const Contact = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
  }, []);
  return (
    <div className="">

      <Hero image={bannerImage} title="Contact Us" />

      <div className="contact-us ">

        <div className="grid grid-2 gap-1">

          <div className="p-3">
            <div className="">

              <h2 className="mb-2">Contact Us</h2>
              <p>
                Need to get in touch with us?
                <br />
                {' '}
                Either fill out the form with your inquiry or contact us through our emails
                {' '}
              </p>
              <div className="flex items-center gap-4 my-2 ">
                {' '}
                <FaPhone />
                {' '}
                <a href="tel:+2348062329699" className="text-dark">+2348062329699</a>
                {' '}
              </div>
              <div className="flex items-center gap-4">
                <MdEmail />
                <a href="mailto:info@melisports.com" className="text-dark">info@melisports.com</a>
                {' '}

              </div>
              <div className="flex gap-3 text-primary mt-2 text-xl">
                <a className="text-primary" target="_blank" href={'https://wa.me/+2347038723093?text=I\'m%20interested%20in%20your%20%20product'} rel="noreferrer"><FaWhatsapp /></a>
                <a className="text-primary" target="_blank" href="https://web.facebook.com/melisports" rel="noreferrer"><FaFacebook /></a>
                <a className="text-primary" target="_blank" href="https://www.instagram.com/melisports/" rel="noreferrer"><FaInstagram /></a>

              </div>
            </div>
          </div>
          <div className="p-2">

            <form action="https://formspree.io/f/xayvlole" method="post">
              <div className="input"><input name="name" id="name" type="text" placeholder="Full name" required minLength="30" /></div>
              <div className="input"><input name="Email" type="email" placeholder="Email address" required /></div>
              <div className="input text-input">
                <textarea maxLength="500" placeholder="Message" />

              </div>
              {/* <button name="message" type="submit">Get in touch</button>
             */}
              <button type="submit" className="btn btn-primary py-2 w-full">Send Message</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

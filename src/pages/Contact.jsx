import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hero from '../components/banner/Hero';
import { closeNav } from '../redux/modal/nav';

const Contact = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
  }, []);
  return (
    <div className="">

      <Hero />

      <div className="contact-us ">

        <div className="grid grid-2 gap-1">

          <div className="p-3">
            <div className="">

              <h2 className="mb-2">Contact Us</h2>
              <p>Need to get in touch with us? <br/> Either fill out the form with your inquiry or find or contact us through our emails </p>
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

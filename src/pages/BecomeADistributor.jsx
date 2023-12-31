import React from 'react';
import DistributorBanner from '../components/banner/Distributor';

const BecomeADistributor = () => (
  <div>
    <div className="">

      <DistributorBanner />

      <div className="contact-us ">

        <div className="grid grid-2 gap-1">

          <div className="p-3">
            <div className="">

              <h2 className="mb-2 font-normal">Become A distributor</h2>
              <p>Need to get in touch with us? Either fill out the form with your inquiry or find or contact us through our emails </p>
            </div>
          </div>
          <div className="p-2">

            <form action="https://formspree.io/f/xayvlole" method="post">
              <div className="input"><input name="company_name" id="name" type="text" placeholder="Company name" /></div>
              <div className="input"><input name="Email" type="email" placeholder="Email address" required /></div>
              <div className="input"><input name="State" type="text" placeholder="State of Business Location" /></div>
              <div className="input text-input">
                <textarea placeholder="Enter business address" />

              </div>
              {/* <button name="message" type="submit">Get in touch</button>
           */}
              <button type="submit" className="btn btn-primary py-2 w-full block">Send Message</button>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
);

export default BecomeADistributor;
